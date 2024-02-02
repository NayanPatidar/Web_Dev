import React, { useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passowrdRef = useRef();
  const passowrdConfirmationRef = useRef();
  const { signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    signup(emailRef.current.value, passowrdRef.current.value);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className=" text-center mb-4">Sign Up</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passowrdRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passowrdConfirmationRef}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 h-100 mt-4">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className=" text-center">
        Already have an account ? <a> Log in </a>
      </div>
    </>
  );
}
