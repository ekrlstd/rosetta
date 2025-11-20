import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          Relief aHead
        </Link>
        <div className="navbar-links">
          <Link to="/about" className="navbar-link">
            About
          </Link>

          <a
            href="https://github.com/ekrlstd/rosetta"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
