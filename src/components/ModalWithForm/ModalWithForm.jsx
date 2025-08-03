import "./ModalWithForm.css";
import close__btn from "../../assets/close.svg";

function ModalWithForm({ children, buttonText, title, isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close-btn">
          <img src={close__btn} alt="Close form" />
        </button>
        <form className="modal__form">
          <h2 className="modal__title">{title}</h2>
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
