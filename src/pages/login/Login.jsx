import { Link } from "react-router-dom";
import { useLoginContext } from "../../contexts/LoginProvider";
import { useState } from "react";
import "./Login.css";
import { BiShowAlt, BiHide } from "react-icons/bi";

export const Login = () => {
  const [show, setShow] = useState(false);
  const {
    setEmailInputHandler,
    setPasswordInputHandler,
    loginHandler,
    login,
    logOutHandler,
  } = useLoginContext();

  return (
    <div className="login">
      {login ? (
        <>
          <h1>You are logged in</h1>
          <button className="button" onClick={logOutHandler}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <h1>Login</h1>
          <div className="mb-4">
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium">
              Email Address
            </label>
            <input
              id="login-email"
              className="input-field"
              onChange={(e) => setEmailInputHandler(e)}
              type="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="login-password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="login-password"
              className="input-field"
              onChange={(e) => setPasswordInputHandler(e)}
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
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
          <p className="mb-4 text-sm">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="ml-1">Remember me</label>
            <Link className="light-link" to="#">
              Forgot your Password?
            </Link>
          </p>
          <button
            className="button login-button"
            onClick={() => loginHandler("real")}
          >
            Log In
          </button>
          <p className="mt-4 text-sm">
            Log in as a test user
            <button className="test" onClick={() => loginHandler("test")}>
              Test Login
            </button>
          </p>
          <p className="text-sm">
            Don&apos;t have an Account?{" "}
            <Link className="basic-link" to="/signup">
              Sign Up
            </Link>
          </p>
        </>
      )}
    </div>
  );
};
