import { useState } from "react";
import "./App.css";
import Signup from "./Signup";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Container
        className="flex align-items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <div className=" max-w-100">
          <Signup />
        </div>
      </Container>
    </>
  );
}

export default App;
