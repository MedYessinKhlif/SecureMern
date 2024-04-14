import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFound.jsx";
import Padlock from "../assets/padlock.png";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8080/api/sign-up/${param.id}/verify/${param.token}`;
        const response = await fetch(url);
        if (response.ok) {
          setValidUrl(true);
        } else {
          setValidUrl(false);
        }
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      } finally {
        setLoading(false); 
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {loading ? (
          <div className="animate-spin text-indigo-900 font-bold text-3xl">
            <div className="flex justify-center">
              <div className="w-3 h-3 bg-current rounded-full mx-1"></div>
              <div className="w-6 h-6 bg-current rounded-full mx-1"></div>
              <div className="w-3 h-3 bg-current rounded-full mx-1"></div>
            </div>
          </div>
        ) : validUrl ? (
          <div>
            <div className="flex justify-center">
              <a href="/">
                <img
                  className="w-20 h-20 pointer-events-none"
                  src={Padlock}
                />
              </a>
            </div>{" "}
            <h1 className="text-3xl font-semibold text-gray-900">
              Your email has been verified successfully!
            </h1>
            <a
              href="/signin"
              className="text-sm font-semibold leading-6 text-indigo-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        ) : (
          <NotFoundPage />
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
