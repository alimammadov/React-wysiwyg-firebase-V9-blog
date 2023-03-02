import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { useForm } from "react-hook-form";
import { useNavigate,   } from "react-router-dom";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Auth } from "aws-amplify";
import {AuthContext} from '../../contex/AuthContext'

const SignIn = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const {dispatch} = useContext(AuthContext)
  
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    } else {
      setLoading(true);

      try {
       const user =  await Auth.signIn(data.username, data.password);
        dispatch({type:'LOGIN', payload: user})
        navigation("/profile");

      } catch (error) {
        alert(error.message);
      }

      setLoading(false);
    }
  };

  // const onSignUpPressed = () => {};
  return (
    <div className="signin" onSubmit={handleSubmit(onSignInPressed)}>
      <form className="inputForm">
        <h1>Sign in account</h1>
        {errors.username && <p className="warn">{errors.username.message}</p>}
        <label htmlFor="username">
          <AccountCircleOutlinedIcon />
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            {...register("username", {
              required: "This is required*",
            })}
          />
        </label>
        {errors.password && <p className="warn">{errors.password.message}</p>}
        <label htmlFor="password">
          <LockOutlinedIcon />
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "This is required*",
            })}
          />
        </label>

        <button type="submit" className="btn btn-submit">
          {loading ? "Loading..." : " Sign In"}
        </button>
      </form>
      <div className="forgot-password ">
        <Link to="forgotpassword"> Forgot password? </Link>
      </div>
      <div className="forgot-password">
        Don`t have an account?<Link to="/signup"> Create one</Link>
      </div>
    </div>
  );
};

export default SignIn;
