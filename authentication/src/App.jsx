import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
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
    console.log(formError[name]);
    formError[name] = "";
  };

  // const checkConfirmPassword = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validateInput(formData));
  };

  const validateInput = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required !";
    } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
      errors.username = "Invalid username. Use only letters, numbers, and underscores";
    }

    if (!values.email) {
      errors.email = "Email is required !";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required !";
    } else if (
      !/^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)
    ) {
      errors.password = "8 characters, at least one number and one special character";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is required !";
    } else if (values.confirmPassword != values.password) {
      errors.confirmPassword = "Passwords don't match !"
    }

    return errors;
  };

  return (
    <>
      <div className="absolute z-10 flex items-center justify-center align-middle w-screen h-screen">
        <div className=" flex flex-col justify-start items-center bg-gray-400 bg-opacity-50 w-80 h-auto min-w-64  border-2  border-solid border-gray-200 rounded-lg p-3">
          <h1 className=" text-2xl font-bold text-white flex justify-center">
            Register
          </h1>

          <div className=" w-11/12 h-max m-3 text-black text-sm p-2">
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col pb-2">
                <label className=" text-white pb-1 ">Name</label>
                <input
                  type="text"
                  name="username"
                  className="rounded h-8 pl-1"
                  onChange={handleInputChange}
                  value={formData.username}
                  required
                />
                <p className="text-red-600">{formError.username}</p>
              </div>
              <div className="flex flex-col pb-2">
                <label className=" text-white pb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="rounded h-8 pl-1"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                />
                <p className="text-red-600">{formError.email}</p>
              </div>
              <div className="flex flex-col pb-2">
                <label className=" text-white pb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="rounded h-8 pl-1"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                />
                <p className="text-red-600">{formError.password}</p>
              </div>
              <div className="flex flex-col pb-2">
                <label className="text-white pb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="rounded h-8 pl-1"
                  onChange={handleInputChange}
                  value={formData.confirmPassword}
                  required
                />
                <p className="text-red-600 ">{formError.confirmPassword}</p>
              </div>
              <button
                type="submit"
                className=" w-full bg-black text-white px-4 py-2 rounded-md mt-8 hover:underline "
              >
                Sign Up
              </button>
            </form>
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
