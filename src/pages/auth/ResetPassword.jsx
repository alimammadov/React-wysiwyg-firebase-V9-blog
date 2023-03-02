import React,{useState} from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Auth } from "aws-amplify";


const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const onResetPasswordPressed = async (data) => {
    if (loading) {
      return;
    } else {
      setLoading(true);

      try {
        await Auth.forgotPasswordSubmit(data.username,data.code, data.password);
        navigation("../");
        
      } catch (error) {
        alert(error.message);
      }

      setLoading(false);
    }
  
  };
  
  return (
    <div className="resetpassword">
      <form
        className="inputForm"
        onSubmit={handleSubmit(onResetPasswordPressed)}
      >
        <h1>Reset your password</h1>
        {errors.username && <p className="warn">{errors.username.message}</p>}
        <label htmlFor="username">
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
        {errors.code && <p className="warn">{errors.code.message}</p>}

        <label htmlFor="code">
          <input type="text" placeholder="Code" id="code" name="code" {...register("code", {
            required: "This is required*",
          })}/>
        </label>
        {errors.password && <p className="warn">{errors.password.message}</p>}

        <label htmlFor="newpassword">
          <input
            type="text"
            placeholder="Enter your new password"
            id="newpassword"
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

export default ResetPassword;
