import React, { useContext, useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contex/AuthContext";
import { getDoc, doc, serverTimestamp } from "firebase/firestore";

import { auth,db } from "../../firebase";
import LogoutIcon from "@mui/icons-material/Logout";
import {signOut } from "firebase/auth";

const Header = () => {
  const { dispatch, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSignOutPressed = async () => {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          dispatch({ type: "LOGOUT" });
          console.log(currentUser);

          navigate("/");
        })
        .catch((error) => {
          // An error happened.
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const [post, setPost] = useState({});
  const getPost = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getPost(currentUser);
  }, [currentUser]);
  return (
    <div className="container header">
      <Link to="/" className="logo">
        <h1>Azərbaycanlılar</h1>
        <span>Hər kəs, doğru bilsin</span>
      </Link>

      {currentUser ? (
        <div className="profile">
          <Link to="/profile">
            <img src={currentUser.photoURL} alt={currentUser.displayName} />
            <b>{currentUser.displayName}</b>
          </Link>
          <button className="logoutbtn" onClick={onSignOutPressed}>
            <LogoutIcon />
          </button>
        </div>
      ) : (
        <Link to="/login" className="profile">
          Daxil ol
        </Link>
      )}
    </div>
  );
};

export default Header;
