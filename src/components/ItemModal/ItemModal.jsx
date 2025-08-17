import "./ItemModal.css";
import close__btn from "../../assets/close.svg";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close-btn">
          <img src={close__btn} alt="Close icon" />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          <button
            type="button"
            className="modal__delete-btn"
            onClick={() => onDelete(card._id)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
