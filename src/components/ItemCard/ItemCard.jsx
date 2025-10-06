import "./ItemCard.css";
import LikeIcone from "../../assets/Like_new.svg";
import LikeIconeActive from "../../assets/Like_hover.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes?.some(
    (id) => currentUser && id === currentUser._id
  );

  const handleLike = (e) => {
    e.stopPropagation();
    if (!currentUser._id) return;
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
      {currentUser && currentUser._id && (
        <button className={`card__like-button`} onClick={handleLike}>
          <img src={isLiked ? LikeIconeActive : LikeIcone} alt="like-btn" />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
