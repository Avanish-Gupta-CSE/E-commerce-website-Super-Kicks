import { createContext, useContext, useReducer } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const LoginContext = createContext();

const reducerFunction = (state, action) => {
    switch (action.type) {
        case "setEmailInput": {
            return { ...state, emailInput: action.payload };
        }
        case "setPasswordInput": {
            return { ...state, passwordInput: action.payload };
        }
        case "setLogin": {
            return { ...state, login: true };
        }
        case "setLogOut": {
            return { ...state, login: false };
        }
        case "setUserDetails": {
            return { ...state, userDetails: action.payload };
        }
        case "setSEmailInput": {
            return { ...state, sEmailInput: action.payload };
        }
        case "setFNInput": {
            return { ...state, fNInput: action.payload };
        }
        case "setLNInput": {
            return { ...state, lNInput: action.payload };
        }
        case "setSPasswordInput": {
            return { ...state, sPasswordInput: action.payload };
        }
        case "setConformInput": {
            return { ...state, conformPasswordInput: action.payload };
        }
        default: {
            return state;
        }
    }
};

export const LoginProvider = ({ children }) => {
    const notify = () => toast("Incorrect Input");
    const notifyLoggedIn = () => toast("Logged In Successfully");
    const conformPasswordNotMatchedNotify = () =>
        toast("Conform password not matched");
    const fillAllInputNotify = () => toast("please fill all the inputs");
    const navigate = useNavigate();
    const location = useLocation();
    const [state, dispatch] = useReducer(reducerFunction, {
        emailInput: "",
        passwordInput: "",
        login: false,
        userDetails: "",
        sEmailInput: "",
        fNInput: "",
        lNInput: "",
        sPasswordInput: "",
        conformPasswordInput: "",
    });
    const fetchLoginDetails = async (type) => {
        try {
            let loginDetais = {};
            if (type === "test") {
                loginDetais = {
                    email: "testuser@gmail.com",
                    password: "testuser",
                };
            } else {
                loginDetais = {
                    email: state.emailInput,
                    password: state.passwordInput,
                };
            }

            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(loginDetais),
            });
            if (res.status === 200) {
                dispatch({ type: "setLogin" });
                const { encodedToken, foundUser } = await res.json();
                localStorage.setItem("encodedToken", encodedToken);
                dispatch({ type: "setUserDetails", payload: foundUser });
                notifyLoggedIn();
                navigate(location?.state?.from?.pathname);
            } else {
                notify();
            }
        } catch (e) {
            console.log(e);
        } finally {
        }
    };
    const fetchSignUpDetails = async () => {
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
                navigate("/login");
            }
        } catch (e) {
            console.log(e);
        } finally {
        }
    };
    const setEmailInputHandler = (e) => {
        dispatch({ type: "setEmailInput", payload: e.target.value });
    };
    const setPasswordInputHandler = (e) => {
        dispatch({ type: "setPasswordInput", payload: e.target.value });
    };
    const loginHandler = (type) => {
        fetchLoginDetails(type);
    };
    const signUpHandler = () => {
        if (
            state.conformPasswordInput === "" ||
            state.fNInput === "" ||
            state.lNInput === "" ||
            state.sEmailInput === "" ||
            state.sPasswordInput === ""
        ) {
            fillAllInputNotify();
        } else if (state.sPasswordInput !== state.conformPasswordInput) {
            conformPasswordNotMatchedNotify();
        } else {
            fetchSignUpDetails();
            notifyLoggedIn();
        }
    };
    const logOutHandler = () => {
        dispatch({ type: "setLogOut" });
    };
    const setSEmailInputHandler = (e) => {
        dispatch({ type: "setSEmailInput", payload: e.target.value });
    };
    const setFNInputHandler = (e) => {
        dispatch({ type: "setFNInput", payload: e.target.value });
    };
    const setLNInputHandler = (e) => {
        dispatch({ type: "setLNInput", payload: e.target.value });
    };
    const setSPasswordInputHandler = (e) => {
        dispatch({ type: "setSPasswordInput", payload: e.target.value });
    };
    const setConformPasswordInputHandler = (e) => {
        dispatch({ type: "setConformInput", payload: e.target.value });
    };

    return (
        <LoginContext.Provider
            value={{
                setEmailInputHandler,
                setPasswordInputHandler,
                loginHandler,
                login: state.login,
                userName: state.userDetails.firstName,
                logOutHandler,
                setSEmailInputHandler,
                setFNInputHandler,
                setLNInputHandler,
                setSPasswordInputHandler,
                setConformPasswordInputHandler,
                signUpHandler,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLoginContext = () => useContext(LoginContext);
