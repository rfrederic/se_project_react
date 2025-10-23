import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSignupClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="login-modal"
      secondaryButtonAction={onSignupClick}
      secondaryButtonText={"Sign up"}
    >
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
        onClick={onSignupClick}
      >
        Or Sign up
      </button> */}
    </ModalWithForm>
  );
}

export default LoginModal;
