import React, { memo, useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import useOverlayClick from "../hooks/useOverlayClick";

const EditProfilePopup = memo(({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, setPending] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPending(true);
    onUpdateUser({ name, about: description }).finally(() => setPending(false));
  };

  useEscapeKeydown(onClose, isOpen);
  const handleOverlayClick = useOverlayClick(onClose);

  return (
    <div
      className={classNamePopup}
      id="popup-edit"
      onClick={handleOverlayClick}
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
            value={name}
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            onChange={handleNameChange}
          />
          <span id="name-input-error" className="popup__input-error"></span>
          <input
            id="job-input"
            type="text"
            name="about"
            className="popup__input popup__input_type_job"
            value={description}
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            onChange={handleDescriptionChange}
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
