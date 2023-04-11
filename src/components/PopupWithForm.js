import React from "react";

export default function PopupWithForm(props) {
  const classNamePopup = `popup ${props.isOpen ? "popup_opened" : ""}`;
  return (
    <div className={classNamePopup} id={`popup-${props.name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={`form${props.name}`}>
          {props.children}
          <button className="popup__save-button" type="submit">
            {props.buttonText || 'Сохранить'}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}