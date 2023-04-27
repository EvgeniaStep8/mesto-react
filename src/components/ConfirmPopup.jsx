import React, { memo } from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import useOverlayClick from "../hooks/useOverlayClick";

const ConfirmPopup = memo(({ isOpen, onClose, onConfirm }) => {
  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm();
    onClose();
  };

  useEscapeKeydown(onClose, isOpen);
  const handleOverlayClick = useOverlayClick(onClose);

  return (
    <div
      className={classNamePopup}
      id="popup-confirm"
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">Вы уверены?</h2>
        <form
          className="popup__form"
          name="popupUpdateAvatarForm"
          noValidate
          onSubmit={handleSubmit}
        >
          <button className="popup__save-button" type="submit">
            Да
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
});

export default ConfirmPopup;
