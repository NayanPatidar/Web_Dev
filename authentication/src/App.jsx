import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <img
        src="/assets/images/background.jpg"
        className="w-full h-screen object-cover brightness-75"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Your Text Here</h1>
      </div>
    </>
  );
}

export default App;
