import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
    localStorage.setItem("userName", userName);
    navigate("/");
  };

  return (
    <div className="bg-white px-4 py-6 rounded-lg shadow-md">
      <div className="bg-gray-700 rounded-lg p-6">
        <h2 className="text-white text-2xl font-bold mb-4">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter Your Name"
            name="userName"
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setUserName(e.target.value);
            }}
            className="w-full bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-6"
            value={userName}
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
