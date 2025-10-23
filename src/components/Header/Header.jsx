import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/bre_avtar.png";
import close__btn from "../../assets/close.svg";
import menu from "../../assets/menu.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpened((prev) => !prev);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city}
      </p>

      <div className="header__toggle-switch-container">
        <ToggleSwitch />
      </div>
      {currentUser ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar || avatar}
                alt={currentUser.name || "User avatar"}
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button className="header__button" onClick={onRegisterClick}>
            Sign Up
          </button>
          <button className="header__button" onClick={onLoginClick}>
            Log In
          </button>
        </div>
      )}

      <button
        className="header__burger"
        onClick={toggleMobileMenu}
        aria-label="Open menu"
      >
        <img src={menu} alt="open menu" />
      </button>

      <nav className={`header__nav ${isMobileMenuOpened ? "open" : ""}`}>
        <button
          className="header__close-btn"
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          <img src={close__btn} alt="close menu" />
        </button>
        <ul className="header__list">
          <li className="header__item mobile-only">
            <Link to="/">Home</Link>
          </li>
          {currentUser && (
            <li className="header__item mobile-only">
              <Link to="/profile">Profile</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
