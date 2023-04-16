import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../../firebase.config";

const auth = getAuth(app);
const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setError("");
        setSuccess("User has been created successfully!");
        console.log(user);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setSuccess("");
      });

    form.email.value = "";
    form.password.value = "";
  };
  return (
    <div className="w-50 mt-5 mx-auto">
      <h4>Please Register</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-50 mb-5 rounded ps-2"
          name="email"
          id="email"
          placeholder="Your Email"
        />
        <br />
        <input
          className="w-50 mb-5 rounded ps-2"
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Submit" />
        <br />
        <p className="text-danger">{error}</p>
        <p className="text-success">{success}</p>
      </form>
    </div>
  );
};

export default Register;
