import { Link } from "react-router-dom";
import "./footer.css";
import { AiOutlineLinkedin } from "react-icons/ai";
import { CgMail } from "react-icons/cg";
import { AiFillGithub } from "react-icons/ai";

export const Footer = () => {
    return (
        <div className="footer">
            <strong>Super-Kicks</strong>
            <div>&#169; &nbsp;&nbsp;&nbsp; Developed By Avanish Gupta</div>
            <div className="social-media">
                <Link
                    to={"https://www.linkedin.com/in/avanish-gupta-aa26341ba/"}
                    target="_blank"
                >
                    <AiOutlineLinkedin />
                </Link>
                <Link
                    to={
                        "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=avanish.gupta.official1@gamil.com"
                    }
                    target="blank"
                >
                    <CgMail />
                </Link>
                <Link to={"https://github.com/Avanish-Gupta-CSE"} target="_blank">
                    <AiFillGithub />
                </Link>
            </div>
        </div>
    );
};
