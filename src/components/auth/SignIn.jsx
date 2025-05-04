import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { firebase_app } from "./FirebaseConfig";
import { context } from "../../AppState";

function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [accData, setAccData] = useState({});
  const navigate = useNavigate();
  const recaptcha = useRef(null);
  const { Dispatch } = useContext(context);
  const auth = getAuth(firebase_app);

  // verify captcha firebase
  // https://firebase.google.com/docs/auth/web/phone-auth
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
  function verifyOTP(code = 123456) {
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        localStorage.setItem("id", accData.customer_id);
        Dispatch({ type: "setAuth", payload: accData });
        navigate("/profile");
        console.log(result);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        setError("otp", {
          message: "Failed to verify This OTP !! Check Again.",
        });
      });
  }

  async function handleFormSubmit(formdata) {
    if (otpSent) return verifyOTP(formdata.otp);

    // send additional data
    try {
      const res = await axios.get(
        "/customer/search?mobile_no=" +
          formdata.mobile_no +
          "&password=" +
          formdata.password
      );
      console.log(res.data);
      if (res?.data?.legth >= 1) {
        reset();
        return setError("password", {
          message: "Could Not find Account with this Credentials.",
        });
      } else {
        setAccData(res.data[0]);
        sendOTP(formdata.mobile_no);
      }
    } catch (e) {
      console.log(e);
      setError("password", {
        type: "NETWORK",
        message: "Network Error while searching your account.",
      });
    }
    // console.log(formdata);
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
        <h1>Sign In</h1>
      </center>
      <div ref={recaptcha}></div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <fieldset role="tree">
          <input
            disabled={otpSent}
            {...register("mobile_no", {
              required: "Please enter Your 10 Digit Mobile Number",
              maxLength: 100,
              pattern: {
                value: /[0-9]{10}/,
                message: "Please enter valid 10 digit mobile Number",
              },
            })}
            type="tel"
            placeholder="Mobile No."
            aria-label="Mobile Number"
            title="enter your mobile"
          />
          <label htmlFor="name" style={{ color: "red" }}>
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
            title="enter strong password"
          />
          <label htmlFor="password" style={{ color: "red" }}>
            {errors?.password?.message}
          </label>
          {otpSent && (
            <>
              <input
                title="enter otp sent to entered Mobile"
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
              <label htmlFor="otp" style={{ color: "red" }}>
                {errors?.otp?.message}
              </label>
            </>
          )}
          <input type="submit" value="sign in" title="signin" />
        </fieldset>
      </form>
      <center>
        Do Not Have Account ?{" "}
        <Link
          to={"/signup"}
          style={{ color: "blueviolet", fontStyle: "italic" }}
        >
          SignUp here
        </Link>
      </center>
    </section>
  );
}

export default SignIn;
