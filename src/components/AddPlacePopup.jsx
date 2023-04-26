import React, { useState, useMemo, useCallback, memo } from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import useOverlayClick from "../hooks/useOverlayClick";

const AddPlacePopup = memo(
  ({ isOpen, onClose, onAddCard, isPending, changePending }) => {
    const classNamePopup = useMemo(
      () => `popup ${isOpen ? "popup_opened" : ""}`,
      [isOpen]
    );

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const handleTitleChange = useCallback((event) => {
      setTitle(event.target.value);
    }, []);

    const handleLinkChange = useCallback((event) => {
      setLink(event.target.value);
    }, []);

    const handleClose = useCallback(() => {
      onClose();
      setTitle("");
      setLink("");
    }, [onClose]);

    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
        changePending();
        onAddCard({ name: title, link }).finally(() => {
          setTitle("");
          setLink("");
          changePending();
        });
      },
      [changePending, onAddCard, title, link]
    );

    useEscapeKeydown(handleClose, isOpen);
    const handleOverlayClick = useOverlayClick(handleClose);

    return (
      <div
        className={classNamePopup}
        id="popup-add"
        onClick={handleOverlayClick}
      >
        <div className="popup__container">
          <h2 className="popup__title">Новое место</h2>
          <form
            className="popup__form"
            name="popupAddForm"
            onSubmit={handleSubmit}
          >
            <input
              id="name-card-input"
              type="text"
              name="title"
              className="popup__input popup__input_type_title"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
              value={title}
              onChange={handleTitleChange}
            />
            <span
              name="name-card-input-error"
              className="popup__input-error"
            ></span>
            <input
              id="link-input"
              type="url"
              name="link"
              className="popup__input popup__input_type_link"
              placeholder="Ссылка на картинку"
              required
              value={link}
              onChange={handleLinkChange}
            />
            <span name="link-input-error" className="popup__input-error"></span>
            <button className="popup__save-button" type="submit">
              {isPending ? "Создать..." : "Создать"}
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

export default AddPlacePopup;
