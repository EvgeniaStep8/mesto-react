import React, { memo, useRef, useState } from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import useOverlayClick from "../hooks/useOverlayClick";

const EditAvatarPopup = memo(
  ({ isOpen, onClose, onUpdateAvatar }) => {
    const inputRef = useRef(null);
    const [isPending, setPending] = useState(false);

    const classNamePopup =  `popup ${isOpen ? "popup_opened" : ""}`
    
    const handleClose = () => {
      onClose();
      inputRef.current.value = "";
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setPending(true);
        onUpdateAvatar({
          avatar: inputRef.current.value,
        }).finally(() => {
          inputRef.current.value = "";
          setPending(false);
        });
      }

    useEscapeKeydown(handleClose, isOpen);
    const handleOverlayClick = useOverlayClick(handleClose);

    return (
      <div
        className={classNamePopup}
        id="popup-update-avatar"
        onClick={handleOverlayClick}
      >
        <div className="popup__container">
          <h2 className="popup__title">Обновить аватар</h2>
          <form
            className="popup__form"
            name="popupUpdateAvatarForm"
            onSubmit={handleSubmit}
          >
            <input
              id="link-avatar-input"
              type="url"
              name="avatar"
              className="popup__input popup__input_type_link"
              placeholder="Ссылка на картинку профиля"
              required
              ref={inputRef}
            />
            <span
              id="link-avatar-input-error"
              className="popup__input-error"
            ></span>
            <button className="popup__save-button" type="submit">
              {isPending ? "Сохранить..." : "Сохранить"}
            </button>
          </form>
          <button
            className="popup__close"
            type="button"
            onClick={handleClose}
          ></button>
        </div>
      </div>
    );
  }
);

export default EditAvatarPopup;