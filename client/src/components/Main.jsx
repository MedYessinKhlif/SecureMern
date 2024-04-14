import React from "react";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex justify-between items-center bg-indigo-900 p-4">
        <div className="flex items-center">
          <a to="/" className="flex items-center">
          <div className="animate-spin text-white">
            <div className="flex justify-center">
              <div className="w-1 h-1 bg-current rounded-full mx-1"></div>
              <div className="w-4 h-4 bg-current rounded-full mx-1"></div>
              <div className="w-1 h-1 bg-current rounded-full mx-1"></div>
            </div>
          </div>
            <h1 className="tracking-tight text-white sm:text-4xl">
              <span className="font-bold">Auth</span>App
            </h1>
          </a>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
          >
            Logout<span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Main;
