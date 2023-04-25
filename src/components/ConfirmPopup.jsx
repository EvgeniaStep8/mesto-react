import React, { memo, useCallback, useMemo } from 'react';
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import useOverlayClick from "../hooks/useOverlayClick";

const ConfirmPopup = memo(
  ({ isOpen, onClose, onConfirm }) => {
    
    const classNamePopup = useMemo(() => `popup ${isOpen ? "popup_opened" : ""}`, [isOpen]);

    

    const handleSubmit = useCallback((event) => {
			event.preventDefault();
      onConfirm();
      
    }, [onConfirm]);

    useEscapeKeydown(onClose);
    const handleOverlayClick = useOverlayClick(onClose);

    return (
      <div className={classNamePopup} id="popup-confirm" onClick={handleOverlayClick}>
        <div className="popup__container">
          <h2 className="popup__title">Вы уверены?</h2>
          <form
            className="popup__form"
            name="popupUpdateAvatarForm"
            noValidate
            onSubmit={handleSubmit}
          >
            <button className="popup__save-button" type="submit">Да</button>
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
);

export default ConfirmPopup;