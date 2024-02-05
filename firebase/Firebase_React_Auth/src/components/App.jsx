import { useState } from "react";
import "./App.css";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Container
      className="flex align-items-center justify-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" Component={Dashboard}/>
              <Route path="/signup" Component={Signup} />
              <Route path="/login" Component={Login} />

            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
