import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./auth.css";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PinIcon from "@mui/icons-material/Pin";

import { Auth } from "aws-amplify";

const ConfirmEmail = () => {
  const [loading, setLoading] = useState(false);
  const { username } = useParams();
  const navigation = useNavigate();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({ defaultValues: { username: username } });

  const name = watch('username');

 
  const onConfirmEmailPressed = async (data) => {
    if (loading) {
      return;
    } else {
      setLoading(true);

      try {
        await Auth.confirmSignUp(data.username, data.code);
        navigation('/signin')
      } catch (error) {
        alert(error.message);
      }

      setLoading(false);
    }
  };

  const onResendPress = async(e)=>{
    e.preventDefault();
    try {
      await Auth.resendSignUp(name);
      alert('Success','Code resend your email')
      navigation('/signin')
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="forgotPassword">
      <form
        className="inputForm"
        onSubmit={handleSubmit(onConfirmEmailPressed)}
      >
        <h1>Confirm your email</h1>
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
        {errors.code && <p className="warn">{errors.code.message}</p>}

        <label htmlFor="code">
          <PinIcon />
          <input
            type="text"
            placeholder="Enter your confirmation code"
            id="code"
            name="code"
            {...register("code", {
              required: "required*",
              minLength: {
                value: 6,
                message: "Confirmation code is wrong",
              },
              maxLength: {
                value: 6,
                message: "Confirmation code is wrong",
              },
            })}
          />
        </label>
        <button type="submit" className="btn btn-submit">
          Send
        </button>
        
      </form>
      <button  className="btn btn-submit" onClick={e=>onResendPress(e)}>
          Resend code
        </button>
    </div>
  );
};

export default ConfirmEmail;
