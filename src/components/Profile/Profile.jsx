import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothingSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick }) {
  return (
    <>
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar />
        </section>
        <section className="profile__clothing-items">
          <ClothingSection onCardClick={onCardClick} />
        </section>
      </div>
    </>
  );
}

export default Profile;
