import React, { memo, useRef, useMemo, useCallback } from "react";

const EditAvatarPopup = memo(
  ({ isOpen, onClose, onUpdateAvatar, isPending, changePending }) => {
    const inputRef = useRef(null);

    const classNamePopup = useMemo(() => `popup ${isOpen ? "popup_opened" : ""}`, [isOpen]);

    const handleClose = useCallback(() => {
      onClose();
      inputRef.current.value = "";
    }, [onClose]);

    const handleSubmit = useCallback((event) => {
      event.preventDefault();
      changePending();
      onUpdateAvatar({
        avatar: inputRef.current.value,
      })
      .finally(() => {
        inputRef.current.value = "";
        changePending();
      });
      
    }, [changePending, onUpdateAvatar]);

    return (
      <div className={classNamePopup} id="popup-update-avatar">
        <div className="popup__container">
          <h2 className="popup__title">Обновить аватар</h2>
          <form
            className="popup__form"
            name="popupUpdateAvatarForm"
            noValidate
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
