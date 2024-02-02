import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./_auth/forms/Signin";
import Signup from "./_auth/forms/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
      <img
        src="/assets/images/background.jpg"
        className="w-full h-screen object-cover brightness-75"
      />
    </>
  );
}

export default App;
