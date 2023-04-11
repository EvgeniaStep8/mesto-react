import React from "react";
import {useState} from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
    isSelected: false,
  });

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleAddCardClick = () => {
    setAddCardPopupOpen(!isAddCardPopupOpen);
  };

  const handleEditPtofileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopup = () => {
    setEditAvatarPopupOpen(false);
    setAddCardPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard({ name: "", link: "", isSelected: false });
  };

  return (
    <div className="app">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onAddCard={handleAddCardClick}
        onEditProfile={handleEditPtofileClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
      >
        <>
          <input
            id="name-input"
            type="text"
            name="name"
            className="popup__input"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span id="name-input-error" className="popup__input-error"></span>
          <input
            id="about-input"
            type="text"
            name="about"
            className="popup__input"
            placeholder="О себе"
            minLength="2"
            maxLength="40"
            required
          />
          <span id="name-input-error" className="popup__input-error"></span>
        </>
      </PopupWithForm>
      <PopupWithForm
        name="add-card"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddCardPopupOpen}
        onClose={closeAllPopup}
      >
        <>
          <input
            id="title-input"
            type="text"
            name="title"
            className="popup__input"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span id="link-input-error" className="popup__input-error"></span>
          <input
            id="link-input"
            type="url"
            name="link"
            className="popup__input"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="name-input-error" className="popup__input-error"></span>
        </>
      </PopupWithForm>
      <PopupWithForm
        name="update-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
      >
        <>
          <input
            id="link-avatar"
            type="url"
            name="link"
            className="popup__input"
            placeholder="Ссылка на картинку профиля"
            required
          />
          <span id="name-input-error" className="popup__input-error"></span>
        </>
      </PopupWithForm>
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        isOpen={false}
        onClose={closeAllPopup}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopup} />
    </div>
  );
}

export default App;
