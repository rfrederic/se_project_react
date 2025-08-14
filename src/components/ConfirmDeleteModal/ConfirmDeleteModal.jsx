import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_confirm">
        <h2 className="modal__title">
          Are you sure you want to delete this item?
        </h2>
        <p className="modal__text">This action is irreversible.</p>
        <div className="modal__actions">
          <button
            className="modal__confirm-btn"
            onClick={onConfirm}
            type="button"
          >
            Yes, Delete Item
          </button>
          <button className="modal__cancel-btn" onClick={onClose} type="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
