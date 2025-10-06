import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  onAddNewClick,
  clothingItems,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="clothes__section">
      <div className="clothes-section__sidebar">
        <p className="clothes__items">Your items</p>
        <button className="clothes__add-clothes-btn" onClick={onAddNewClick}>
          +Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              currentUser={currentUser}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
