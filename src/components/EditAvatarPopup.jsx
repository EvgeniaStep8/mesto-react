import React, { memo, useState } from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import useInputsChange from "../hooks/useInputsChange"
import handleOverlayClick from "../utils/utils";

const EditAvatarPopup = memo(
  ({ isOpen, onClose, onUpdateAvatar }) => {
    const classNamePopup =  `popup ${isOpen ? "popup_opened" : ""}`;

    const [isPending, setPending] = useState(false);
    const { values, setValues, handleChange } = useInputsChange({ avatar: "" });
  
    const handleClose = () => {
      onClose();
      setValues({ avatar: "" });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setPending(true);
        onUpdateAvatar(values).finally(() => {
          setValues({ avatar: "" });
          setPending(false);
        });
      }

      useEscapeKeydown(handleClose, isOpen);
      const handleCloseByOverlayClick = handleOverlayClick(onClose);

    return (
      <div
        className={classNamePopup}
        id="popup-update-avatar"
        onClick={handleCloseByOverlayClick}
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
              value={values.avatar}
              onChange={handleChange}
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