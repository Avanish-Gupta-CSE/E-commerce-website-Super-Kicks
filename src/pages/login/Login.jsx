import { Link } from "react-router-dom";
import { useLoginContext } from "../../contexts/LoginProvider";
import { useState } from "react";
import "./Login.css";
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";



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
                    <h1>Logged In</h1>
                    <button className="button" onClick={logOutHandler}>Log Out</button>
                </>
            ) : (
                <>
                    <h1>Login</h1>
                    <br />
                    <input
                        className="input-field"
                        onChange={(e) => setEmailInputHandler(e)}
                        type="email"
                        placeholder="Email address"
                        required
                    />
                    <br />
                    <input
                        className="input-field"
                        onChange={(e) => setPasswordInputHandler(e)}
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        required
                    />
                    <button
                        className="show-button"
                        onClick={() => {
                            show ? setShow(false) : setShow(true);
                        }}
                    >
                        {show ? <BiHide/> : <BiShowAlt/>}
                    </button>
                    <p>
                        <input type="checkbox" />
                        Remember me <Link className="light-link">Forgot your Password?</Link>
                    </p>
                    <button className="button login-button" onClick={() => loginHandler("real")}>Log In</button>
                    <p>
                        Log in as a test user
                        <button className="test" onClick={() => loginHandler("test")}>
                            Test Login
                        </button>
                    </p>
                    <p>
                        Don't have an Account ?{" "}
                        <Link className="basic-link" to={"/signup"}>Sign Up</Link>
                    </p>
                </>
            )}
        </div>
    );
};
