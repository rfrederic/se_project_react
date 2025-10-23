import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onLoginClick }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="register-modal"
      secondaryButtonAction={onLoginClick}
      secondaryButtonText="Log In"
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>

      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {/* <button
        type="button"
        className="modal__alt-button"
        onClick={onLoginClick}
      >
        Or Log In
      </button> */}
    </ModalWithForm>
  );
}

export default RegisterModal;
