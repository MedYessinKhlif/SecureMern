import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { GrValidate } from "react-icons/gr";
import { MdErrorOutline } from "react-icons/md";

const ToastMessage = ({ message, setMessage, successIcon }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      // Automatically hide the message after 7 seconds
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setMessage(""); // Clear the message after hiding
      }, 7000);

      // Clean up the timeout when component unmounts or message changes
      return () => clearTimeout(timeout);
    }
  }, [message, setMessage]);

  // Define the icon component
  const IconComponent = successIcon ? GrValidate : MdErrorOutline;

  return (
    <div
      className={`fixed bottom-8 right-8 m-3 p-3 bg-gray-50 rounded border border-gray-400 ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Render the icon component */}
        <IconComponent
          className={successIcon ? "text-green-900" : "text-red-900"}
          size={20}
        />
        <p className="ml-2">{message}</p>
        {isVisible && (
          <button
            className="ml-2 text-gray-600 hover:text-gray-900"
            onClick={() => {
              setIsVisible(false);
              setMessage("");
            }}
          >
            <IoClose className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ToastMessage;
