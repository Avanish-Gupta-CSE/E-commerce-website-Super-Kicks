import { Link } from "react-router-dom";
import { useLoginContext } from "../../contexts/LoginProvider";
import { useState } from "react";
import "./Signup.css";
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

export const Signup = () => {
    const [show, setShow] = useState(false);
    const [showConform, setShowConform] = useState(false);

    const {
        setSEmailInputHandler,
        setFNInputHandler,
        setLNInputHandler,
        setSPasswordInputHandler,
        setConformPasswordInputHandler,
        signUpHandler,
    } = useLoginContext();
    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <p>
                <input
                    className="input-field"
                    onChange={(e) => {
                        setSEmailInputHandler(e);
                    }}
                    placeholder="Email"
                    type="text"
                />
            </p>
            <p>
                <input
                    className="input-field"
                    onChange={(e) => setFNInputHandler(e)}
                    placeholder="First Name"
                    type="text"
                />
            </p>
            <p>
                <input
                    className="input-field"
                    onChange={(e) => setLNInputHandler(e)}
                    placeholder="Last Name"
                    type="text"
                />
            </p>
            <p>
                <input
                    className="input-field"
                    onChange={(e) => setSPasswordInputHandler(e)}
                    placeholder="Password"
                    type={show ? "text" : "password"}
                />
                <button
                    className="show-button"
                    onClick={() => {
                        show ? setShow(false) : setShow(true);
                    }}
                >
                    {show ? <BiHide/> : <BiShowAlt/>}
                </button>
            </p>
            <p>
                <input
                    className="input-field"
                    onChange={(e) => setConformPasswordInputHandler(e)}
                    placeholder="Conform Password"
                    type={showConform ? "text" : "password"}
                />
                <button
                    className="show-button"
                    onClick={() => {
                        showConform
                            ? setShowConform(false)
                            : setShowConform(true);
                    }}
                >
                    {showConform ? <BiHide/> : <BiShowAlt/>}
                </button>
            </p>
            <button className="button signup-button" type="submit" onClick={signUpHandler}>
                Sign Up
            </button>
            <p>
                Already have an account? <Link className="basic-link" to={"/login"}>Log In</Link>
            </p>
        </div>
    );
};
