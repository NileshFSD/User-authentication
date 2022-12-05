import { signOut } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/firebase-config";
import Edit from "./Edit";

import { FaUser, FaPhone } from "react-icons/fa";

function User() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function open(e) {
    e.preventDefault();
    setShow(true);
  }

  useEffect(() => {
    const storeRef = query(collection(db, "users"), orderBy("created", "asc"));
    onSnapshot(storeRef, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoggedInUser(user);
    });
  }, []);

  const userDetails = users.find((user) => {
    return user.data.email === loggedInUser?.email;
  });

  const logout = async (e) => {
    e.preventDefault();
    navigate("/login");
    await signOut(auth);
  };

  return (
    <div className="user">
      <div className="user-details">
        <div>
          <button className="log-out" onClick={logout}>
            LogOut
          </button>
        </div>

        <div>
          {show ? (
            <Edit
              setShow={setShow}
              toName={userDetails.data.name}
              toEmail={userDetails.data.email}
              toAddress={userDetails.data.address}
              toContact={userDetails.data.contact}
              id={userDetails.id}
            />
          ) : (
            <div className="user-container">
              {userDetails?.data.role === "Admin" ? (
                <div className="admin-container">
                  <div className="profile">
                    <div>
                      <FaUser className="profile-pic" />
                    </div>
                    <div> {userDetails?.data.name} </div>
                    <div style={{ color: "gray" }}>
                      {" "}
                      {userDetails?.data.role}{" "}
                    </div>
                  </div>
                  <div className="userDetails">
                    <div>
                      <div className="property">
                        {" "}
                        <i className="fa-solid fa-envelope"></i> Email{" "}
                      </div>
                      <div className="value">{userDetails?.data.email}</div>
                    </div>

                    <div>
                      <div className="property">
                        {" "}
                        <FaPhone /> Contact No{" "}
                      </div>
                      <div className="value">{userDetails?.data.contact}</div>
                    </div>

                    <div>
                      <div className="property">
                        {" "}
                        <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
                        Address{" "}
                      </div>
                      <div className="value">{userDetails?.data.address}</div>
                    </div>
                    <button className="edit" onClick={open}>
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="guest-container">
                  <div className="guest-profile">
                    <div>
                      <FaUser className="guest-profile-pic" />
                    </div>
                    <div> {userDetails?.data.name} </div>
                    <div> {userDetails?.data.role} </div>
                  </div>
                  <div className="guest-userDetails">
                    <div>
                      <div className="guest-property"> Email </div>
                      <div className="guest-value">
                        {userDetails?.data.email}
                      </div>
                    </div>

                    <div>
                      <div className="guest-property"> Contact No </div>
                      <div className="guest-value">
                        {userDetails?.data.contact}
                      </div>
                    </div>

                    <div>
                      <div className="guest-property">Address </div>
                      <div className="guest-value">
                        {userDetails?.data.address}
                      </div>
                    </div>
                    {/* <div className="edit-container">
                      <button className="edit" onClick={open}>
                        Edit
                      </button>
                    </div> */}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
