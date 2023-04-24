import React from 'react';

const AddPlacePopup = ({ isOpen, onClose,  onAddCard}) => {
  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;
  return (
    <div className={classNamePopup} id="popup-add">
      <div className="popup__container">
        <h2 className="popup__title">Новое место</h2>
        <form className="popup__form" name="popupAddForm" novalidate>
          <input
            id="name-card-input"
            type="text"
            name="title"
            className="popup__input popup__input_type_title"
            placeholder="Название"
            minlength="2"
            maxlength="30"
            required
          />
          <span name="name-card-input-error" className="popup__input-error"></span>
          <input
            id = "link-input"
            type="url"
            name="link"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span name="link-input-error" className="popup__input-error"></span>
          <button
            className="popup__save-button"
            type="submit"
          >
            Создать
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        >
        </button>
      </div>
    </div>
  )
}

export default AddPlacePopup;