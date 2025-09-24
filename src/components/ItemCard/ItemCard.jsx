import "./ItemCard.css";
import LikeIcone from "../../assets/logo.svg";

function ItemCard({ item, onCardClick, onCardLike, currentUser }) {
  const isLiked = item.likes?.some((id) => id === currentUser._id);

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
      {currentUser._id && (
        <button
          className={`card__like-button ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <img src={LikeIcone} alt="like-btn" className="card__like-button" />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
