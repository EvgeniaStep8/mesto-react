import React from "react";

export default function ImagePopup(props) {
  const isOpen = props.card.isSelected;
  const classNamePopup = `popup popup_overlay_dark ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={classNamePopup} id="popup-open-image">
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img
            alt={props.card.name}
            src={props.card.link}
            className="popup__image"
          />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}