import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase-config";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setTimeout(() => {
        alert("Login Successfully");
        navigate("/user");
      }, 2000);
    } catch (error) {
      alert("invalid email/password");
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="signin-container">
      <form className="signin-form" method="post">
        <br />
        <label htmlFor="login-email">Email </label>
        <input
          type="email"
          name="login-email"
          id="login-email"
          placeholder="Email"
          autoComplete="off"
          ref={emailRef}
        />

        <br />
        <label htmlFor="login-password">Password </label>
        <input
          type="password"
          name="login-password"
          id="login-password"
          placeholder="*********"
          required
          autoComplete="off"
          ref={passwordRef}
        />

        <button onClick={handleLogin} className="signIn-btn">
          Sign-In
        </button>
        <br />
        <br />
        <hr />
        <Link to="/">Click here to register</Link>
      </form>
    </div>
  );
};

export default Login;
