import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./auth.css";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { Auth } from "aws-amplify";

const ForgotPassword = () => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const onForgotPasswordPressed = async (data) => {
    if (loading) {
      return;
    } else {
      setLoading(true);

      try {
        await Auth.forgotPassword(data.username);
        navigation("../resetpassword");
        
      } catch (error) {
        alert(error.message);
      }

      setLoading(false);
    }
  
  };

  return (
    <div className="forgotPassword">
      <form
        className="inputForm"
        onSubmit={handleSubmit(onForgotPasswordPressed)}
      >
        <h1>Send reset code</h1>
        {errors.username && <p className="warn">{errors.username.message}</p>}

        <label htmlFor="username">
          <AccountCircleOutlinedIcon />
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            {...register("username", {
              required: "required*",
              minLength: {
                value: 3,
                message: "Minimum length must be 3 simvol",
              },
              maxLength: {
                value: 20,
                message: "Maximum length must be 20 simvol",
              },
            })}
          />
        </label>
        <button type="submit" className="btn btn-submit">
          Send
        </button>
      </form>
      <div className="forgot-password ">
      <Link to="../"> Back to </Link>
    </div>
    </div>
  );
};

export default ForgotPassword;
