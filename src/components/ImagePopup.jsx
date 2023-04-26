import React, { memo, useMemo } from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import useOverlayClick from "../hooks/useOverlayClick";

const ImagePopup = memo(({ card, onClose }) => {
  const isOpen = useMemo(() => card.isSelected, [card]);
  const classNamePopup = useMemo(() => {
    return `popup popup_overlay_dark ${isOpen ? "popup_opened" : ""}`;
  }, [isOpen]);

  useEscapeKeydown(onClose, isOpen);
  const handleOverlayClick = useOverlayClick(onClose);

  return (
    <div
      className={classNamePopup}
      id="popup-open-image"
      onClick={handleOverlayClick}
    >
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
