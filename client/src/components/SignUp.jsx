import React, { useState } from "react";
import { Link } from "react-router-dom";
import ToastMessage from "./ToastMessage"; // Import the ToastMessage component
import Padlock from "../assets/padlock.png";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "http://localhost:8080/api/sign-up";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        setMsg(""); // Clear any existing success message
      } else {
        const responseData = await response.json();
        setMsg(responseData.message);
        setError(""); // Clear any existing error message
      }
    } catch (error) {
      setError(error.message);
      setMsg(""); // Clear any existing success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <a href="/">
            <img className="w-20 h-20 pointer-events-none" src={Padlock} />
          </a>
        </div>
        <h2 className="text-center  text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                onChange={handleChange}
                value={data.firstName}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
                maxLength="25"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                onChange={handleChange}
                value={data.lastName}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
                maxLength="25"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
            </div>

            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="current-email"
                onChange={handleChange}
                value={data.email}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

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
                autoComplete="current-password"
                onChange={handleChange}
                value={data.password}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign up"}
            </button>
          </div>
          {error && !msg && (
            <p className="text-red-900">
              <ToastMessage
                message={error}
                setMessage={setError}
                successIcon={false}
              />
            </p>
          )}
          {msg && !error && (
            <p className="text-green-900">
              <ToastMessage
                message={msg}
                setMessage={setMsg}
                successIcon={true}
              />
            </p>
          )}
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Have an account?{" "}
          <a
            href="/signin"
            className="font-semibold leading-6 text-indigo-900 hover:text-indigo-800"
          >
            Go sign in now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
