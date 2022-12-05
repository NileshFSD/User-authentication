import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/firebase-config";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert(
          "your password is not matched, please re-Entre the same password"
        );
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(collection(db, "users"), {
          name: name,
          email: email,
          contact: contact,
          address: address,
          role: role,
          created: Timestamp.now(),
        });

        setTimeout(() => {
          alert("Registration done, we are redirecting you to on user page");
          navigate("/user");
        }, 1000);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" method="post" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="off"
        />
        <br />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="contact">Contact </label>
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="Mobile Number"
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <br />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
        />

        <br />
        <label htmlFor="password">Confirm Password </label>
        <input
          type="password"
          name="confirm-password"
          id="password"
          placeholder="*********"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <label htmlFor="role">Please select your Role</label>
        <select
          name="role"
          id="role"
          required
          onChange={(e) => setRole(e.target.value)}
        >
          <option defaultValue="role">Select</option>
          <option value="Admin">Admin</option>
          <option value="Guest">Guest</option>
        </select>

        <label htmlFor="address">Address</label>
        <br />
        <textarea
          name="address"
          id="address"
          rows="4"
          required
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <br />
        <button type="submit" className="signup-btn">
          Sign-Up
        </button>

        <div>
          <hr />
          <br />

          <span>Already have an account?</span>

          <Link to="/login">
            <strong> Login</strong>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
