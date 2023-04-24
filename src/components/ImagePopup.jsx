import React, { memo } from "react";

const ImagePopup = memo(({ card, onClose }) => {
  const isOpen = card.isSelected;
  const classNamePopup = `popup popup_overlay_dark ${
    isOpen ? "popup_opened" : ""
  }`;

  return (
    <div className={classNamePopup} id="popup-open-image">
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img alt={card.name} src={card.link} className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
});

export default ImagePopup;
