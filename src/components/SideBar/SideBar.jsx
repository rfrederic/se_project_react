import "./SideBar.css";
import avatar from "../../assets/bre_avtar.png";

function SideBar() {
  return (
    <>
      <div className="sidebar">
        <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
        <p className="sidebar__username">Sabrina Frederic</p>
      </div>
    </>
  );
}

export default SideBar;
