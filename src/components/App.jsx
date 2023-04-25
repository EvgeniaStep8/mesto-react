import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardsContext } from "../contexts/CurrentCardsContext";

const App = () => {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isPending, setPending] = useState(false);

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
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
      ([userData, cards]) => {
        setCurrentUser(userData);
        setCurrentCards(cards);
      }
    );
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

  const closeAllPopup = () => {
    setEditAvatarPopupOpen(false);
    setAddCardPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard({ name: "", link: "", isSelected: false });
  };

  const changePending = () => {
    setPending(state => !state);
  }

  const handleUpdateUser = (userInfo) => {
    api
      .patchUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(()=> setPending(false));
  };

  const handleUpdateAvatar = (userAvatar) => {
    return api
      .patchUserAvatar(userAvatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  };

  const handlePlaceSubmit = (card) => {
    return api
      .postCard(card)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleLikeClick = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeCardLikes(card._id, isLiked)
      .then((newCard) => {
        setCurrentCards((state) =>
          state.map((cardItem) =>
            card._id === cardItem._id ? newCard : cardItem
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() =>
        setCurrentCards((state) =>
          state.filter((cardItem) => cardItem._id !== card._id)
        )
      )
      .catch((err) => console.log(err));
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
            onCardLikeClick={handleLikeClick}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            onUpdateUser={handleUpdateUser}
            isPending={isPending}
            changePending={changePending}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
            onUpdateAvatar={handleUpdateAvatar}
            isPending={isPending}
            changePending={changePending}
          />
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopup}
            onAddCard={handlePlaceSubmit}
            isPending={isPending}
            changePending={changePending}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopup} />
        </div>
      </CurrentCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
