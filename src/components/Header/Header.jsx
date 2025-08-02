import { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/bre_avtar.png";
import close__btn from "../../assets/close.svg";
import menu from "../../assets/menu.svg";

function Header({ handleAddClick, weatherData }) {
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
      <img src={logo} alt="logo" className="header__logo" />

      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city}
      </p>

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      <div className="header__user-container">
        <p className="header__username">Sabrina Frederic</p>
        <img src={avatar} alt="Sabrina Frederic" className="header__avatar" />
      </div>

      <button
        className="header__burger"
        onClick={toggleMobileMenu}
        aria-label="Open menu"
      >
        <img src={menu} alt="open menu" />
      </button>

      <nav className={`header__nav ${isMobileMenuOpened ? "open" : ""}`}>
        {" "}
        <button
          className="header__close-btn"
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          <img src={close__btn} alt="close menu" />
        </button>
        <ul className="header__list">
          <li className="header__item mobile-only">
            <a href="/">Home</a>
          </li>
          <li className="header__item mobile-only">
            <a href="/profile">Profile</a>
          </li>
          <li className="header__item mobile-only">
            <a href="/items">Items</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
