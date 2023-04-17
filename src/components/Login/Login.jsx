import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import app from "../../../firebase.config";
import { Link } from "react-router-dom";
const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const handleSignIn = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleShowPass = (e) => {
    e.preventDefault();
    e.target.previousSibling.getAttribute("type") == "password"
      ? e.target.previousSibling.setAttribute("type", "text")
      : e.target.previousSibling.setAttribute("type", "password");
  };

  return (
    <div className="w-50 mx-auto mt-5">
      <h4>Please Login!</h4>
      <form onSubmit={handleSignIn}>
        <input
          className="mb-3 rounded ps-2"
          type="email"
          name="email"
          id="email"
          required
        />
        <br />
        <input
          className="mb-3 rounded ps-2"
          type="password"
          name="password"
          id="password"
          required
        />
        <button onClick={handleShowPass}>Show Pasword</button>
        <br />
        <p>
          Do not have account? <Link to="/register">Register</Link>
        </p>
        <input className="btn btn-primary" type="submit" value="Login" />
      </form>
      <p className="text-danger">{error}</p>
    </div>
  );
};

export default Login;
