import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-toastify";
import "./Signup.css";

export const Signup = () => {
  const { isAuthenticated, signUp } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.warn("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    try {
      await signUp({ email, password, firstName, lastName });
    } catch {
      // toast handled in AuthProvider
    } finally {
      setSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="form-card">
          <p className="text-center text-muted">You are already signed in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form className="form-card" onSubmit={handleSignup}>
        <h1>Create Account</h1>

        <div className="signup-fields">
          <div className="signup-name-row">
            <div className="input-group">
              <label htmlFor="signup-firstname">First Name</label>
              <input
                id="signup-firstname"
                className="input-field"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="signup-lastname">Last Name</label>
              <input
                id="signup-lastname"
                className="input-field"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password">Password</label>
            <div className="password-wrapper">
              <input
                id="signup-password"
                className="input-field"
                type={showPassword ? "text" : "password"}
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                minLength={6}
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

          <div className="input-group">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <div className="password-wrapper">
              <input
                id="signup-confirm-password"
                className="input-field"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            className="button signup-button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </div>

        <p className="form-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};
