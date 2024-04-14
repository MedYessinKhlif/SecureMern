import { useState } from "react";
import ToastMessage from "./ToastMessage";
import Padlock from "../assets/padlock.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `http://localhost:8080/api/password-reset`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const responseData = await response.json();
      setMsg(responseData.message);
      setError("");
    } catch (error) {
      setError(error.message);
      setMsg("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <a href="/">
            <img
              className="w-20 h-20 pointer-events-none"
              src={Padlock}
              alt="Your Company"
            />
          </a>
        </div>
        <h1 className="mt-2 text-1xl font-semibold text-gray-900">
          Don't forget to review your email inbox!
        </h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="mt-2">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
              disabled={loading}
            >
              {loading ? "Verifying email..." : "Verify your email"}
            </button>
          </div>
          {error && (
            <p className="text-red-900">
              <ToastMessage
                message={error}
                setMessage={setError}
                successIcon={false}
              />
            </p>
          )}
          {msg && (
            <p className="text-green-900">
              <ToastMessage
                message={msg}
                setMessage={setMsg}
                successIcon={true}
              />
            </p>
          )}
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          <a
            href="/"
            className="font-semibold leading-6 text-indigo-900 hover:text-indigo-800"
          >
            Go back <span aria-hidden="true">&rarr;</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
