import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="absolute z-10 flex items-center justify-center align-middle w-screen h-screen">
        <div
          style={{ height: "425px" }}
          className=" flex flex-col justify-start items-center bg-gray-400 bg-opacity-50 w-80 min-w-64  border-2  border-solid border-gray-200 rounded-lg p-3"
        >
          <h1 className=" text-2xl font-bold text-white flex justify-center">
            Register
          </h1>
          <div className=" w-11/12 h-max m-3 text-black text-sm p-2">
            <div className="flex flex-col pb-2">
              <label className=" text-white pb-1 ">Name</label>
              <input
                type="text"
                name="username"
                className="rounded h-8 pl-1"
                onChange={handleInputChange}
                value={formData.username}
              />
            </div>

            <div className="flex flex-col pb-2">
              <label className=" text-white pb-1">Email</label>
              <input
                type="email"
                name="email"
                className="rounded h-8 pl-1"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>

            <div className="flex flex-col pb-2">
              <label className=" text-white pb-1">Password</label>
              <input
                type="password"
                name="password"
                className="rounded h-8 pl-1"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>

            <div className="flex flex-col pb-2">
              <label className="text-white pb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="rounded h-8 pl-1"
                onChange={handleInputChange}
                value={formData.confirmPassword}
              />
            </div>

            <button
              type="submit"
              className=" w-full bg-black text-white px-4 py-2 rounded-md mt-8 hover:underline "
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <img
        src="/assets/images/background.jpg"
        className="w-full h-screen object-cover brightness-75"
      />
    </>
  );
}

export default App;
