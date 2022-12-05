import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../Firebase/firebase-config";

import { GrClose } from "react-icons/gr";

function Edit({ setShow, toName, toEmail, toAddress, toContact, id }) {
  const [name, setName] = useState(toName);
  const [email, setEmail] = useState(toEmail);
  const [contact, setContact] = useState(toContact);
  const [address, setAddress] = useState(toAddress);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateDocRef = doc(db, "users", id);

    try {
      await updateDoc(updateDocRef, { name, email, contact, address });
    } catch (error) {
      alert(error);
    }

    setShow(false);
  };

  const close = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <div className="edit-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div onClick={close} className="close">
          <GrClose style={{ float: "right", cursor: "pointer" }} />
        </div>
        <label htmlFor="name">Full Name </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="contact">Contact </label>
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="Mobile Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <label htmlFor="address">Address</label>
        <br />
        <textarea
          name="address"
          id="address"
          rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <br />
        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
    </div>
  );
}

export default Edit;
