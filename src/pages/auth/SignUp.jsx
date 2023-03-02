import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MailIcon from '@mui/icons-material/Mail';import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import { Auth } from "aws-amplify";


const SignUp = () => {

  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();


  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({});

  const onSignUpPressed = async (data) => {

    const {username,password,name,email} = data;
    if (loading) {
      return;
    } else {

      setLoading(true);

      try {
        const response = await Auth.signUp({
          username,
          password,
          attributes:{
            email,
            name,
            preferred_username: username
          }

        });
        console.log(response);
        navigation(`/signin/${username}`);

      } catch (error) {
        alert(error.message);
      }

      setLoading(false);


    }
  };
  return (
    <div className="signup">
      <form className="inputForm" onSubmit={handleSubmit(onSignUpPressed)}>
        <h1>Create an account</h1>

        {errors.username && <p className="warn">{errors.username.message}</p>}
        <label>
          <AccountCircleOutlinedIcon />
          <input
            type="text"
            placeholder="Username"
            name="username"
            {...register("username", {
              required: "required*",
              minLength: {
                value: 3,
                message: "Minimum length must be 3 simvol",
              },
              maxLength: {
                value: 50,
                message: "Maximum length must be 20 simvol",
              },
            })}
          />
        </label>
        {errors.name && <p className="warn">{errors.name.message}</p>}
        <label>
          <BadgeOutlinedIcon />
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            {...register("name", {
              required: "required*",
              minLength: {
                value: 3,
                message: "Minimum length must be 3 simvol",
              },
              maxLength: {
                value: 60,
                message: "Maximum length must be 60 simvol",
              },
            })}
          />
        </label>
        {errors.email && <p className="warn">{errors.email.message}</p>}
        <label htmlFor="email">
          <MailIcon />
          <input
            type="email"
            placeholder="Email"
            name="email"
            {...register("email", {
              required: "required*",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
        </label>

        {errors.password && <p className="warn">{errors.password.message}</p>}
        <label htmlFor="password">
          <LockOutlinedIcon />
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", {
              required: "required",
              minLength: {
                value: 6,
                message: "min length is 6",
              },
            })}
          />
        </label>

        {errors.password_repeat && (
          <p className="warn">{errors.password_repeat.message}</p>
        )}
        <label htmlFor="repassword">
          <LockOutlinedIcon />
          <input
            type="password"
            placeholder="Re-password"
            name="password_repeat"
            {...register("password_repeat", {
              required: true,
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
        </label>
        <button type="submit" className="btn btn-submit">
          Register
        </button>
      </form>
      <div className="forgot-password ">
        By registering you confirm that you accept our
        <Link to="/thermsofuse"> Terms of Use </Link> and
        <Link to="/privacypolicy"> Privacy Policy </Link>
      </div>
      <div className="forgot-password">
        Have an account?
        <Link to="/signin"> Sign in</Link>
      </div>
    </div>
  );
};

export default SignUp;
