import React, { memo, useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import useInputsChange from "../hooks/useInputsChange";
import handleOverlayClick from "../utils/utils";

const EditProfilePopup = memo(({ isOpen, onClose, onUpdateUser }) => {
  const [isPending, setPending] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange } = useInputsChange({ name: "", about: "" });

  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;
  
  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPending(true);
    onUpdateUser(values)
    .finally(() => {
      setPending(false);
    });
  };

  useEscapeKeydown(onClose, isOpen);
  const handleCloseByOverlayClick = handleOverlayClick(onClose);

  return (
    <div
      className={classNamePopup}
      id="popup-edit"
      onClick={handleCloseByOverlayClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">Редактировать профиль</h2>
        <form
          className="popup__form"
          name="popupEditForm"
          onSubmit={handleSubmit}
        >
          <input
            id="name-input"
            type="text"
            name="name"
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            value={values.name}
            onChange={handleChange}
          />
          <span id="name-input-error" className="popup__input-error"></span>
          <input
            id="job-input"
            type="text"
            name="about"
            className="popup__input popup__input_type_job"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            value={values.about}
            onChange={handleChange}
          />
          <span id="job-input-error" className="popup__input-error"></span>
          <button className="popup__save-button" type="submit">
            {isPending ? "Сохранить..." : "Сохранить"}
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

export default EditProfilePopup;
