import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const currentPage = useLocation().pathname;
  return (
    <header>
      <h1 className="header__logo__play">
        PLAY<span className="header__logo__planner">PLANNER</span>
      </h1>
      <div className="header__search">
        <input
          className="header__search__bar"
          type="text"
          placeholder="Search for a game..."
        />
        <button className="search__bar__button" type="submit">
          Search
        </button>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link
              to="/"
              className={currentPage === "/" ? "navLinkActive" : "navLink"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/wishlist"
              className={
                currentPage === "/wishlist" ? "navLinkActive" : "navLink"
              }
            >
              Wish List
            </Link>
          </li>
          <li>
            <Link
              to="/played"
              className={
                currentPage === "/played" ? "navLinkActive" : "navLink"
              }
            >
              Played Games
            </Link>
          </li>
          {/* <li>
            <Link to="/login" className={currentPage === "/login ? "navLinkActive" : "navLink"}>Login</Link>
          </li> */}
        </ul>
      </nav>
      <div className="header__auth">
        <Link to="/login">
          <button className="header__auth__login">Login</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
