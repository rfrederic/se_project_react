import "./SideBar.css";
import React from "react";

function SideBar({ currentUser, onEditProfileClick, onSignOutClick }) {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar || "/assets/bre_avtar.png"}
        alt={currentUser.name || "Default avatar"}
      />
      <p className="sidebar__username">
        {currentUser.name || "Sabrina Frederic"}
      </p>

      <button className="sidebar__edit-btn" onClick={onEditProfileClick}>
        Edit profile
      </button>

      <button className="sidebar__signout-btn" onClick={onSignOutClick}>
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
