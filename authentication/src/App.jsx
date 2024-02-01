import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import "./App.css";

function App() {
  function onSubmit(values) {
    console.log(values);
  }

  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });

  return (
    <>
      <div className="absolute z-10 flex items-center justify-center align-middle w-screen h-screen">
        <div className=" bg-gray-400 bg-opacity-50 w-80 h-96 min-w-64  border-2  border-solid border-gray-200 rounded-lg flex flex-col justify-start items-center p-3">
          <h1 className=" text-2xl font-bold text-white flex justify-center">
            Register
          </h1>
          <div className=" w-11/12 h-3/5 m-3 text-black text-sm p-2">
            <div className="flex flex-col">
              <label className=" text-white">Name</label>
              <input type="text" className="rounded"></input>
            </div>

            <div className="flex flex-col">
              <label className=" text-white">Email</label>
              <input type="email" className="rounded"></input>
            </div>

            <div className="flex flex-col">
              <label className=" text-white">Password</label>
              <input type="password" className="rounded"></input>
            </div>

            <div className="flex flex-col">
              <label className="text-white">Confirm Password</label>
              <input type="password" className="rounded"></input>
            </div>
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
