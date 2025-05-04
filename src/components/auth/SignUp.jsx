import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { firebase_app } from "./FirebaseConfig";
import axios from "axios";
import { context } from "../../AppState";

function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm();
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const recaptcha = useRef(null);
  const { Dispatch } = useContext(context);
  const auth = getAuth(firebase_app);

  const verifyCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptcha.current, {
      size: "invisible",
      callback: (response) => {},
    });
  };

  async function sendOTP(phoneNumber) {
    verifyCaptcha(); // Replace with actual element ID
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, "+91" + phoneNumber.toString(), appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        setOtpSent(true);
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
        setError("mobile_no", {
          message: "Faild to send OTP !!. Try again.",
        });
      });
  }
  function verifyOTP(formdata) {
    window.confirmationResult
      .confirm(formdata.otp)
      .then(async (result) => {
        // User signed in successfully.
        console.log(result);

        const res = await axios.post("/customer", {
          ...formdata,
          entry_by: 0,
          entry_by_role: 5,
        });
        console.log(res.data);
        if (!res.data) return alert("Signup has Failed. Please Try Again.");
        Dispatch({
          type: "setAuth",
          payload: {
            customer_id: res.data.insertId,
            name: getValues("name"),
            mobile_no: getValues("mobile_no"),
            password: getValues("password"),
          },
        });
        localStorage.setItem("id", res.data.insertId);
        navigate("/profile");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log(error);
        let msg = "Failed to verify This OTP !! Check Again.";
        if (error?.response?.data?.code === "ER_DUP_ENTRY")
          msg = "This Mobile Number Already Exists";
        setError("otp", {
          message: msg,
        });
      });
  }

  async function handleFormSubmit(formdata) {
    // verify otp
    if (otpSent) return verifyOTP(formdata);

    // send additional data
    try {
      //  return alert("can not send otp");
      sendOTP(formdata.mobile_no);
    } catch (e) {
      console.log(e.message);
      setError("password", {
        type: "NETWORK",
        message: "Network Error in Sending OTP.",
      });
    }
  }

  return (
    <section
      id="book-a-table"
      className="book-a-table"
      style={{
        marginTop: 60,
        maxWidth: 500,
        margin: "auto",
      }}
    >
      <center>
        <h1>Sign Up</h1>
      </center>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <fieldset role="tree">
          <input
            disabled={otpSent}
            {...register("name", {
              required: "Please enter Your Name",
              maxLength: 100,
            })}
            type="text"
            placeholder="Name"
            aria-label="Name"
          />
          <label style={{ color: "red" }} htmlFor="name">
            {errors?.name?.message}
          </label>
          <input
            disabled={otpSent}
            {...register("mobile_no", {
              required: "Please enter Your Mobile Number",
              maxLength: 100,
            })}
            type="tel"
            placeholder="Mobile No."
            aria-label="Mobile Number"
          />
          <label style={{ color: "red" }} htmlFor="name">
            {errors?.mobile_no?.message}
          </label>
          <input
            disabled={otpSent}
            {...register("password", {
              required: "Please Enter Your Password",
              pattern: {
                value: /[0-9a-zA-Z]{8,}/,
                message: "Please enter Strong password",
              },
            })}
            type="password"
            placeholder="Password"
            aria-label="Password"
          />
          <label style={{ color: "red" }} htmlFor="password">
            {errors?.password?.message}
          </label>
          {otpSent && (
            <>
              <input
                {...register("otp", {
                  required: "please enter OTP before continuing",
                  pattern: {
                    value: /[0-9]{6}/,
                    message: "Wrong OTP!! Please check again.",
                  },
                  min: 100000,
                  max: 999999,
                })}
                type="number"
                placeholder="OTP"
                aria-label="otp"
              />
              <label style={{ color: "red" }} htmlFor="otp">
                {errors?.otp?.message}
              </label>
            </>
          )}
          <input type="submit" value="Sign Up" />
        </fieldset>
      </form>
      <center>
        Already Have Account ?{" "}
        <Link
          to={"/signin"}
          style={{ color: "blueviolet", fontStyle: "italic" }}
        >
          SignIn here
        </Link>
      </center>
      <div ref={recaptcha}></div>
    </section>
  );
}

export default SignUp;
