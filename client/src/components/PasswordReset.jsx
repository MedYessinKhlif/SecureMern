import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ToastMessage from "./ToastMessage";
import NotFoundPage from "./NotFound";
import Padlock from "../assets/padlock.png";

const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setValidUrl(true);
        } else {
          setValidUrl(false);
        }
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
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

  if (validUrl === null) {
    return (
      <div className="flex h-screen justify-center items-center text-indigo-900">
        <div className="animate-spin">
          <div className="flex">
            <div className="w-3 h-3 bg-current rounded-full mx-1"></div>
            <div className="w-6 h-6 bg-current rounded-full mx-1"></div>
            <div className="w-3 h-3 bg-current rounded-full mx-1"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {validUrl ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center">
              <a href="/">
                <img className="w-20 h-20 pointer-events-none" src={Padlock} />
              </a>
            </div>
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
                  />
                </div>
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

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Confirm your password"}
                </button>
              </div>
            </form>
            {msg && (
              <p className="mt-10 text-center text-sm text-gray-500">
                <a
                  href="/"
                  className="font-semibold leading-6 text-indigo-900 hover:text-indigo-800"
                >
                  Go sign in now <span aria-hidden="true">&rarr;</span>
                </a>
              </p>
            )}
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};

export default PasswordReset;
