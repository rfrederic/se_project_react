import { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/bre_avtar.png";
import close__btn from "../../assets/close.svg";
import menu from "../../assets/menu.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
}) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />{" "}
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city}
      </p>

      <div className="header__toggle-switch-container">
        <ToggleSwitch />
      </div>

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      <div className="header__auth-buttons">
        <button onClick={onRegisterClick}>Register</button>
        <button onClick={onLoginClick}>Login</button>
      </div>

      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Sabrina Frederic</p>
          <img src={avatar} alt="Sabrina Frederic" className="header__avatar" />
        </div>
      </Link>

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
          <li className="header__item mobile-only">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="header__item mobile-only">
            <Link to="/items">Items</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
