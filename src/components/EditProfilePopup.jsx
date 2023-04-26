import React, {
  memo,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import useOverlayClick from "../hooks/useOverlayClick";

const EditProfilePopup = memo(
  ({ isOpen, onClose, onUpdateUser, isPending, changePending }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);

    const classNamePopup = useMemo(
      () => `popup ${isOpen ? "popup_opened" : ""}`,
      [isOpen]
    );

    useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleNameChange = useCallback((event) => {
      setName(event.target.value);
    }, []);

    const handleDescriptionChange = useCallback((event) => {
      setDescription(event.target.value);
    }, []);

    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
        changePending();
        onUpdateUser({ name, about: description });
      },
      [changePending, onUpdateUser, name, description]
    );

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
  }
);

export default EditProfilePopup;