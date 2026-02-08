import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-toastify";
import * as authApi from "../../lib/api/auth";
import "./Login.css";

const TEST_EMAIL = "testuser@superkicks.com";
const TEST_PASSWORD = "testuser123";

export const Login = () => {
  const { isAuthenticated, signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
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
      await signIn({ email: TEST_EMAIL, password: TEST_PASSWORD });
    } catch {
      // Test user doesn't exist yet — create it, then use the returned session
      try {
        const result = await authApi.signUp({
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
          firstName: "Test",
          lastName: "User",
        });
        // If Supabase auto-confirmed the user, session is set via onAuthChange listener
        if (result?.session) {
          toast.success("Logged in successfully");
          navigate("/");
        } else {
          // Fallback: try signing in after a brief delay
          await new Promise((r) => setTimeout(r, 500));
          await signIn({ email: TEST_EMAIL, password: TEST_PASSWORD });
        }
      } catch (signUpErr) {
        toast.error(signUpErr.message || "Failed to create test account");
      }
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
      <div className="auth-container">
        <div className="form-card">
          <p className="text-center text-muted">You are already logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form className="form-card" onSubmit={handleLogin}>
        <h1>Welcome Back</h1>

        <div className="login-fields">
          <div className="input-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="input-field"
              type="email"
              placeholder="you@example.com"
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
                className="input-field"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          <div className="login-actions">
            <button
              className="button login-button"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Logging in..." : "Log In"}
            </button>

            <button
              className="button-secondary login-button"
              type="button"
              onClick={handleTestLogin}
              disabled={submitting}
            >
              Login with Test Credentials
            </button>
          </div>
        </div>

        <div className="login-forgot">
          <button
            type="button"
            className="button-text"
            onClick={() => setShowReset(!showReset)}
          >
            Forgot Password?
          </button>
        </div>

        {showReset && (
          <div className="reset-form">
            <div className="input-group">
              <label htmlFor="reset-email">Reset Email</label>
              <input
                id="reset-email"
                className="input-field"
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <button
              type="button"
              className="button login-button"
              onClick={handleResetPassword}
            >
              Send Reset Link
            </button>
          </div>
        )}

        <p className="form-footer">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};
