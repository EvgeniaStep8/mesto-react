import React, { useRef } from 'react';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
	const inputRef = useRef(null);

	const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

  const handleSubmit = event => {
    event.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
	

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
            id = "link-avatar-input"
            type="url"
            name="avatar"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку профиля"
            required
						ref={inputRef}
          />
          <span id = "link-avatar-input-error" className="popup__input-error"></span>
          <button className="popup__save-button" type="submit">Сохранить</button>
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

export default EditAvatarPopup;