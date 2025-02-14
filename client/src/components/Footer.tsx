import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>
          Created using{" "}
          <a
            href="https://rawg.io/apidocs"
            target="_blank"
            rel="noopener noreferrer"
          >
            [RAWG API]
          </a>{" "}
        </p>
      </div>
      <div>
        <p>&copy; 2025 Blake Anderson, Jay Bhatt, Jake Ringate, Kira Ziegler</p>
      </div>
    </footer>
  );
};

export default Footer;
