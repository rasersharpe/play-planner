import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1 className="header__logo">PLAY PLANNER</h1>
      <div className="header__search">
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/wishlist">Wish List</Link>
          </li>
          <li>
            <Link to="/played">Played Games</Link>
          </li>
          {/* <li>
            <Link to="/login">Login</Link>
          </li> */}
        </ul>
      </nav>
      <div className="header__auth">
        <button className="header__auth__login">Login</button>
      </div>
    </header>
  );
};

export default Header;
