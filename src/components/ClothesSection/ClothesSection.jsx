import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, onAddNewClick, clothingItems }) {
  return (
    <div className="clothes__section">
      <div className="clothes-section__sidebar">
        <p className="clothes__items">Your items</p>
        <button className="clothes__add-clothes-btn" onClick={onAddNewClick}>
          +Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
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
