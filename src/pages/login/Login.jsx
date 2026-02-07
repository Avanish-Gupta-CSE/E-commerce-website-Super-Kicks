import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import "./Login.css";

export const Login = () => {
  const { isAuthenticated, signIn, signInWithGoogle, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signIn({ email, password });
    } catch {
      // toast handled in AuthProvider
    } finally {
      setSubmitting(false);
    }
  };

  const handleTestLogin = async () => {
    setSubmitting(true);
    try {
      await signIn({ email: "testuser@gmail.com", password: "testuser123" });
    } catch {
      // toast handled in AuthProvider
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(resetEmail);
      setShowReset(false);
      setResetEmail("");
    } catch {
      // toast handled in AuthProvider
    }
  };

  if (isAuthenticated) {
    return (
      <div className="login-container">
        <p className="login-status">You are logged in.</p>
      </div>
    );
  }

  return (
    <div className="login-container">
      <form className="login" onSubmit={handleLogin}>
        <h1>Login</h1>

        <div className="input-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="login-password">Password</label>
          <div className="password-wrapper">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          className="button login-button"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Log In"}
        </button>

        <button
          className="button test-login-button"
          type="button"
          onClick={handleTestLogin}
          disabled={submitting}
        >
          Login with Test Credentials
        </button>

        <button
          className="button google-button"
          type="button"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>

        <button
          type="button"
          className="forgot-password-link"
          onClick={() => setShowReset(!showReset)}
        >
          Forgot Password?
        </button>

        {showReset && (
          <div className="reset-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              autoComplete="email"
            />
            <button
              type="button"
              className="button"
              onClick={handleResetPassword}
            >
              Send Reset Email
            </button>
          </div>
        )}

        <p className="signup-link">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};
