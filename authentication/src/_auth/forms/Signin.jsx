import { useEffect, useState } from "react";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const [isSubmit, setSubmit] = useState(false);

  const handleInputChange = () => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    formError[name] = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validateInput(formData));
    setSubmit(true);
  };

  const validateInput = (values) => {
    const errors = {};

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
      errors.password =
        "8 characters, at least one number and one special character";
    }

    return errors;
  };

  useEffect( () => {
    
  })

  return (
    <>
      <div className="absolute z-10 flex items-center justify-center align-middle w-screen h-screen">
        <div className=" flex flex-col justify-start items-center bg-gray-400 bg-opacity-50 w-80 h-auto min-w-64  border-2  border-solid border-gray-200 rounded-lg p-3">
          <h1 className=" text-2xl font-bold text-white flex justify-center">
            Welcome Back !
          </h1>

          <div className=" w-11/12 h-max m-3 text-black text-sm p-2">
            <form onSubmit={handleSubmit} noValidate>
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
              <button
                type="submit"
                className=" w-full bg-black text-white px-4 py-2 rounded-md mt-5 hover:underline "
              >
                Sign In
              </button>
              <p className="text-center self-center text-white">
                Don't have an account?{" "}
                <a href="your_login_page_url" className=" hover:underline">
                  Signup here.
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signin;
