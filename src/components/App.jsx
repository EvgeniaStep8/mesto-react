import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardsContext } from "../contexts/CurrentCardsContext";

const App = () => {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
    isSelected: false,
  });

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: "",
  });

  const [currentCards, setCurrentCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo, api.getInitialCards]).then(
      ([userData, cards]) => {
        setCurrentUser(userData);
        setCurrentCards(cards);
      }
    );
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardsContext.Provider value={currentCards}>
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
            <Input
              id="nameInput"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
            />
            <Input
              id="aboutInput"
              name="about"
              placeholder="О себе"
              minLength="2"
              maxLength="40"
            />
          </PopupWithForm>
          <PopupWithForm
            name="add-card"
            title="Новое место"
            buttonText="Создать"
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopup}
          >
            <Input
              id="titleInput"
              name="title"
              placeholder="Название"
              minLength="2"
              maxLength="30"
            />
            <Input
              id="linkInput"
              name="link"
              placeholder="Ссылка на картинку"
            />
          </PopupWithForm>
          <PopupWithForm
            name="update-avatar"
            title="Обновить аватар"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
          >
            <Input
              type="url"
              id="linkAvatarInput"
              name="linkAvatar"
              placeholder="Ссылка на картинку профиля"
            />
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
      </CurrentCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
