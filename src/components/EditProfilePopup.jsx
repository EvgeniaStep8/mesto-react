import React, { useState } from 'react';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
	const [name, setName] = useState('');
	const [description, setDescrription] = useState('');

	const handleNameChange = (event) => {
    setName(event.target.value);
	}
  const handleDescriptionChange = (event) => {
    setDescrription(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		onUpdateUser({ name, about: description });
		onClose();
	}

	const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

  return (
		<div className={classNamePopup} id="popup-edit">
      <div className="popup__container">
        <h2 className="popup__title">Редактировать профиль</h2>
        <form
				  className="popup__form"
					name="popupEditForm"
					noValidate
					onSubmit={handleSubmit}
				>
          <input
            id = "name-input"
            type="text"
            name="name"
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
						onChange={handleNameChange}
          />
          <span id = "name-input-error" className="popup__input-error"></span>
          <input
            id="job-input"
            type="text"
            name="about"
            className="popup__input popup__input_type_job"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
						onChange={handleDescriptionChange}
          />
          <span id = "job-input-error" className="popup__input-error"></span>
          <button className="popup__save-button" type="submit">Сохранить</button>
        </form>
        <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </div>
	)
}

export default EditProfilePopup;