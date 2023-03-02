import React, { useContext, useState } from "react";
import "./auth.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, provider, db } from "../../firebase";
import { AuthContext } from "../../contex/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorText from "../../components/ErrorText/ErrorText";

const Login = () => {
  const [error, setError] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const {photoURL, displayName, uid} = user
        dispatch({ type: "LOGIN", payload: {photoURL,displayName,uid,token} });
        handleUser(user);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        setError(errorMessage)
        // The email of the user's account used.
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handleUser = async (currentUser) => {
    try {
      
      await setDoc(doc(db, "users", currentUser.uid), {
        name: currentUser.displayName,
        picture: currentUser.photoURL,
        email: currentUser.email,
        accessToken: currentUser.stsTokenManager.accessToken,
        author: currentUser.uid,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="loginPage">
      <p className="infoAboutLogin">
        Qeytiyyatdan keçmək və ya daxil olmaq üçün bir Gmail hesabınız
        olmalıdır.
      </p>
      <button onClick={handleWithGoogle} className="login-with-google-btn">
        Daxil ol
      </button>
      <ErrorText props={error}/>
    </div>
  );
};

export default Login;
