import { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const LoginContext = createContext();

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "setEmailInput":
      return { ...state, emailInput: action.payload };
    case "setPasswordInput":
      return { ...state, passwordInput: action.payload };
    case "setLogin":
      return { ...state, login: true };
    case "setLogOut":
      return { ...state, login: false, userDetails: "" };
    case "setUserDetails":
      return { ...state, userDetails: action.payload };
    case "setSEmailInput":
      return { ...state, sEmailInput: action.payload };
    case "setFNInput":
      return { ...state, fNInput: action.payload };
    case "setLNInput":
      return { ...state, lNInput: action.payload };
    case "setSPasswordInput":
      return { ...state, sPasswordInput: action.payload };
    case "setConfirmInput":
      return { ...state, confirmPasswordInput: action.payload };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  emailInput: "",
  passwordInput: "",
  login: false,
  userDetails: "",
  sEmailInput: "",
  fNInput: "",
  lNInput: "",
  sPasswordInput: "",
  confirmPasswordInput: "",
};

// Test credentials for demo purposes
const TEST_CREDENTIALS = {
  email: "testuser@gmail.com",
  password: "testuser",
};

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  const fetchLoginDetails = useCallback(async (type) => {
    try {
      const loginDetails =
        type === "test"
          ? TEST_CREDENTIALS
          : { email: state.emailInput, password: state.passwordInput };

      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginDetails),
      });

      if (res.status === 200) {
        dispatch({ type: "setLogin" });
        const { encodedToken, foundUser } = await res.json();
        localStorage.setItem("encodedToken", encodedToken);
        dispatch({ type: "setUserDetails", payload: foundUser });
        toast.success("Logged in successfully");
        navigate(location?.state?.from?.pathname || "/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("[Login] Failed:", error.message);
      toast.error("Login failed. Please try again.");
    }
  }, [state.emailInput, state.passwordInput, navigate, location]);

  const fetchSignUpDetails = useCallback(async () => {
    try {
      const signUpDetails = {
        email: state.sEmailInput,
        password: state.sPasswordInput,
        firstName: state.fNInput,
        lastName: state.lNInput,
      };

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(signUpDetails),
      });

      if (res.status === 201) {
        const { createdUser, encodedToken } = await res.json();
        dispatch({ type: "setLogin" });
        localStorage.setItem("encodedToken", encodedToken);
        dispatch({ type: "setUserDetails", payload: createdUser });
        toast.success("Account created successfully");
        navigate("/");
      } else {
        toast.error("Signup failed. Email may already exist.");
      }
    } catch (error) {
      console.error("[Signup] Failed:", error.message);
      toast.error("Signup failed. Please try again.");
    }
  }, [state.sEmailInput, state.sPasswordInput, state.fNInput, state.lNInput, navigate]);

  const setEmailInputHandler = useCallback((e) => {
    dispatch({ type: "setEmailInput", payload: e.target.value });
  }, []);

  const setPasswordInputHandler = useCallback((e) => {
    dispatch({ type: "setPasswordInput", payload: e.target.value });
  }, []);

  const loginHandler = useCallback((type) => {
    fetchLoginDetails(type);
  }, [fetchLoginDetails]);

  const signUpHandler = useCallback(() => {
    if (
      !state.confirmPasswordInput ||
      !state.fNInput ||
      !state.lNInput ||
      !state.sEmailInput ||
      !state.sPasswordInput
    ) {
      toast.warn("Please fill in all fields");
    } else if (state.sPasswordInput !== state.confirmPasswordInput) {
      toast.warn("Passwords do not match");
    } else {
      fetchSignUpDetails();
    }
  }, [state.confirmPasswordInput, state.fNInput, state.lNInput, state.sEmailInput, state.sPasswordInput, fetchSignUpDetails]);

  const logOutHandler = useCallback(() => {
    dispatch({ type: "setLogOut" });
    localStorage.removeItem("encodedToken");
    toast.success("Logged out");
    navigate("/");
  }, [navigate]);

  const setSEmailInputHandler = useCallback((e) => {
    dispatch({ type: "setSEmailInput", payload: e.target.value });
  }, []);

  const setFNInputHandler = useCallback((e) => {
    dispatch({ type: "setFNInput", payload: e.target.value });
  }, []);

  const setLNInputHandler = useCallback((e) => {
    dispatch({ type: "setLNInput", payload: e.target.value });
  }, []);

  const setSPasswordInputHandler = useCallback((e) => {
    dispatch({ type: "setSPasswordInput", payload: e.target.value });
  }, []);

  const setConfirmPasswordInputHandler = useCallback((e) => {
    dispatch({ type: "setConfirmInput", payload: e.target.value });
  }, []);

  const value = useMemo(
    () => ({
      setEmailInputHandler,
      setPasswordInputHandler,
      loginHandler,
      login: state.login,
      userName: state.userDetails?.firstName || "",
      logOutHandler,
      setSEmailInputHandler,
      setFNInputHandler,
      setLNInputHandler,
      setSPasswordInputHandler,
      setConfirmPasswordInputHandler,
      signUpHandler,
    }),
    [
      setEmailInputHandler,
      setPasswordInputHandler,
      loginHandler,
      state.login,
      state.userDetails,
      logOutHandler,
      setSEmailInputHandler,
      setFNInputHandler,
      setLNInputHandler,
      setSPasswordInputHandler,
      setConfirmPasswordInputHandler,
      signUpHandler,
    ]
  );

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
