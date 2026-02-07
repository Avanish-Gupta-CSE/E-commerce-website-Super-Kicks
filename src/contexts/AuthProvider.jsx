import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as authApi from "../lib/api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    authApi.getSession().then((s) => {
      setSession(s);
      setLoading(false);
    });

    const subscription = authApi.onAuthChange((s) => {
      setSession(s);
      if (!s) {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load profile when session is available
  useEffect(() => {
    if (session?.user) {
      authApi
        .getProfile()
        .then(setProfile)
        .catch((err) => console.error("[Auth] Profile fetch failed:", err));
    }
  }, [session?.user?.id]);

  const signIn = useCallback(
    async ({ email, password }) => {
      try {
        await authApi.signIn({ email, password });
        toast.success("Logged in successfully");
        navigate(location?.state?.from?.pathname || "/");
      } catch (error) {
        console.error("[Auth] Sign in failed:", error.message);
        toast.error(error.message || "Invalid email or password");
        throw error;
      }
    },
    [navigate, location]
  );

  const signUp = useCallback(
    async ({ email, password, firstName, lastName }) => {
      try {
        await authApi.signUp({ email, password, firstName, lastName });
        toast.success("Account created successfully");
        navigate("/");
      } catch (error) {
        console.error("[Auth] Sign up failed:", error.message);
        toast.error(error.message || "Signup failed");
        throw error;
      }
    },
    [navigate]
  );

  const signInWithGoogle = useCallback(async () => {
    try {
      await authApi.signInWithGoogle();
    } catch (error) {
      console.error("[Auth] Google sign in failed:", error.message);
      toast.error("Google sign in failed");
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authApi.signOut();
      setProfile(null);
      toast.success("Logged out");
      navigate("/");
    } catch (error) {
      console.error("[Auth] Sign out failed:", error.message);
    }
  }, [navigate]);

  const updateProfile = useCallback(async ({ firstName, lastName }) => {
    try {
      const updated = await authApi.updateProfile({ firstName, lastName });
      setProfile(updated);
      toast.success("Profile updated");
      return updated;
    } catch (error) {
      console.error("[Auth] Profile update failed:", error.message);
      toast.error("Failed to update profile");
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email) => {
    try {
      await authApi.resetPassword(email);
      toast.success("Password reset email sent");
    } catch (error) {
      console.error("[Auth] Password reset failed:", error.message);
      toast.error(error.message || "Failed to send reset email");
      throw error;
    }
  }, []);

  const isAuthenticated = !!session?.user;
  const userName = profile?.firstName || session?.user?.email?.split("@")[0] || "";

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      isAuthenticated,
      userName,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      updateProfile,
      resetPassword,
    }),
    [
      session,
      profile,
      isAuthenticated,
      userName,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      updateProfile,
      resetPassword,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
