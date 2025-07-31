import "./ModalWithForm.css";
import close__btn from "../../assets/close.svg";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close-btn">
          <img src={close__btn} alt="Close form" />
        </button>
        <form className="modal__form">
          {children}
          <h2 className="modal__title">{title}</h2>
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
