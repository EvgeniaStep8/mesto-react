import React from "react";

export default function PopupWithForm({ isOpen, name, title, buttonText, onClose, children }) {
  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;
  return (
    <div className={classNamePopup} id={`popup-${name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`form-${name}`}>
          {children}
          <button className="popup__save-button" type="submit">
            {buttonText || 'Сохранить'}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}