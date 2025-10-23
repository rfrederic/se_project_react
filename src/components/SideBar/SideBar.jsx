import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";
import React, { useContext } from "react";

function SideBar({ onEditProfileClick, onSignOutClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar || "/assets/bre_avtar.png"}
          alt={currentUser.name || "Default avatar"}
        />
        <p className="sidebar__username">
          {currentUser.name || "Sabrina Frederic"}
        </p>
      </div>

      <button className="sidebar__edit-btn" onClick={onEditProfileClick}>
        Change profile data
      </button>

      <button className="sidebar__signout-btn" onClick={onSignOutClick}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
