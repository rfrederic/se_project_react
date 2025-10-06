import "./ItemModal.css";
import closeBtn from "../../assets/close.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  if (!isOpen) return null;

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close-btn">
          <img src={closeBtn} alt="Close icon" />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {currentUser && currentUser._id === card.owner && (
            <button
              type="button"
              className="modal__delete-btn"
              onClick={() => onDelete(card._id)}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
