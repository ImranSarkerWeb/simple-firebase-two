import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../../firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setError("");
        setSuccess("User has been created successfully!");
        handleUserProfile(result.user, name);
        handleVerify(result.user);
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
  const handleUserProfile = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log("Success!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleVerify = (user) => {
    sendEmailVerification(user).then(() => {
      alert("verification message has been sent your mail");
    });
  };
  return (
    <div className="w-50 mt-5 mx-auto">
      <h4>Please Register</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-50 mb-5 rounded ps-2"
          name="name"
          id="user-name"
          placeholder="Your Name"
        />
        <br />
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
        <p>
          Alredy registered! <Link to="/login">Sign In</Link>
        </p>
        <input className="btn btn-primary" type="submit" value="Submit" />
        <br />
        <p className="text-danger">{error}</p>
        <p className="text-success">{success}</p>
      </form>
    </div>
  );
};

export default Register;
