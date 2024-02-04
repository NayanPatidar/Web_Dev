import { useState } from "react";
import "./App.css";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Container
        className="flex align-items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Signup />
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
