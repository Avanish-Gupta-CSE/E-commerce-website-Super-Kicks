import { Link } from "react-router-dom";
import { useLoginContext } from "../../contexts/LoginProvider";
import { useState } from "react";
import "./Signup.css";
import { BiShowAlt, BiHide } from "react-icons/bi";

export const Signup = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    setSEmailInputHandler,
    setFNInputHandler,
    setLNInputHandler,
    setSPasswordInputHandler,
    setConfirmPasswordInputHandler,
    signUpHandler,
  } = useLoginContext();

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <div className="mb-3">
        <label htmlFor="signup-email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="signup-email"
          className="input-field"
          onChange={(e) => setSEmailInputHandler(e)}
          placeholder="Enter your email"
          type="email"
          autoComplete="email"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="signup-firstname" className="mb-1 block text-sm font-medium">
          First Name
        </label>
        <input
          id="signup-firstname"
          className="input-field"
          onChange={(e) => setFNInputHandler(e)}
          placeholder="Enter your first name"
          type="text"
          autoComplete="given-name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="signup-lastname" className="mb-1 block text-sm font-medium">
          Last Name
        </label>
        <input
          id="signup-lastname"
          className="input-field"
          onChange={(e) => setLNInputHandler(e)}
          placeholder="Enter your last name"
          type="text"
          autoComplete="family-name"
        />
      </div>
      <div className="relative mb-3">
        <label htmlFor="signup-password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <input
          id="signup-password"
          className="input-field"
          onChange={(e) => setSPasswordInputHandler(e)}
          placeholder="Create a password"
          type={show ? "text" : "password"}
          autoComplete="new-password"
        />
        <button
          className="show-button absolute right-2 top-8"
          onClick={() => setShow(!show)}
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <BiHide /> : <BiShowAlt />}
        </button>
      </div>
      <div className="relative mb-3">
        <label htmlFor="signup-confirm" className="mb-1 block text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="signup-confirm"
          className="input-field"
          onChange={(e) => setConfirmPasswordInputHandler(e)}
          placeholder="Confirm your password"
          type={showConfirm ? "text" : "password"}
          autoComplete="new-password"
        />
        <button
          className="show-button absolute right-2 top-8"
          onClick={() => setShowConfirm(!showConfirm)}
          type="button"
          aria-label={showConfirm ? "Hide password" : "Show password"}
        >
          {showConfirm ? <BiHide /> : <BiShowAlt />}
        </button>
      </div>
      <button
        className="button signup-button"
        type="submit"
        onClick={signUpHandler}
      >
        Sign Up
      </button>
      <p className="text-sm">
        Already have an account?{" "}
        <Link className="basic-link" to="/login">
          Log In
        </Link>
      </p>
    </div>
  );
};
