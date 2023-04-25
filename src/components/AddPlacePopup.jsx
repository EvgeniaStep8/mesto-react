import React, { useState, memo } from "react";

const AddPlacePopup = memo(
  ({ isOpen, onClose, onAddCard, isPending, changePending }) => {
    const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };

    const handleLinkChange = (event) => {
      setLink(event.target.value);
    };

    const handleClose = () => {
      onClose();
      setTitle("");
      setLink("");
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      changePending();
      onAddCard({ name: title, link })
      .finally(()=> {
        setTitle("");
        setLink("");
        changePending();
      });
    };

    return (
      <div className={classNamePopup} id="popup-add">
        <div className="popup__container">
          <h2 className="popup__title">Новое место</h2>
          <form
            className="popup__form"
            name="popupAddForm"
            noValidate
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
