import { Link } from "react-router-dom";
import "./footer.css";
import { AiOutlineLinkedin, AiFillGithub } from "react-icons/ai";
import { CgMail } from "react-icons/cg";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <strong className="text-xl tracking-wide">Super Kicks</strong>
      <p className="text-sm text-primary-foreground/60">
        Premium sneakers from top brands worldwide
      </p>
      <div className="social-media">
        <Link
          to="https://www.linkedin.com/in/avanish-gupta-aa26341ba/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <AiOutlineLinkedin />
        </Link>
        <Link
          to="mailto:avanish.gupta.official1@gmail.com"
          aria-label="Send email"
        >
          <CgMail />
        </Link>
        <Link
          to="https://github.com/Avanish-Gupta-CSE"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <AiFillGithub />
        </Link>
      </div>
      <div className="text-xs text-primary-foreground/40">
        &copy; {currentYear} Super Kicks. Developed by Avanish Gupta
      </div>
    </footer>
  );
};
