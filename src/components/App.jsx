import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const App = () => {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [confirmedCardForDelete, setConfirmedCardForDelete] = useState({});

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

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEditAvatarClick = useCallback(() => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }, [isEditAvatarPopupOpen]);

  const handleAddCardClick = useCallback(() => {
    setAddCardPopupOpen(!isAddCardPopupOpen);
  }, [isAddCardPopupOpen]);

  const handleEditPtofileClick = useCallback(() => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }, [isEditProfilePopupOpen]);

  const closeAllPopup = useCallback(() => {
    setEditAvatarPopupOpen(false);
    setAddCardPopupOpen(false);
    setEditProfilePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({ name: "", link: "", isSelected: false });
  }, []);

  const handleUpdateUser = useCallback(
    (userInfo) => {
      return api
        .patchUserInfo(userInfo)
        .then((user) => {
          setCurrentUser(user);
          closeAllPopup();
        })
        .catch((err) => console.log(err));
    },
    [closeAllPopup]
  );

  const handleUpdateAvatar = useCallback(
    (userAvatar) => {
      return api
        .patchUserAvatar(userAvatar)
        .then((user) => {
          setCurrentUser(user);
          closeAllPopup();
        })
        .catch((err) => console.log(err));
    },
    [closeAllPopup]
  );

  const handlePlaceSubmit = useCallback(
    ({ title: name, link }) => {
      return api
        .postCard({ name, link })
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopup();
        })
        .catch((err) => console.log(err));
    },
    [closeAllPopup, cards]
  );

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  const handleLikeClick = useCallback(
    (card) => {
      const isLiked = card.likes.some((like) => like._id === currentUser._id);
      api
        .changeCardLikes(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((cardItem) =>
              card._id === cardItem._id ? newCard : cardItem
            )
          );
        })
        .catch((err) => console.log(err));
    },
    [currentUser]
  );

  const handleCardDelete = useCallback(
    (card) => {
      setConfirmPopupOpen(!isConfirmPopupOpen);
      setConfirmedCardForDelete(card);
    },
    [isConfirmPopupOpen]
  );

  const handleConfirm = useCallback(() => {
    api
      .deleteCard(confirmedCardForDelete._id)
      .then(() =>
        setCards((state) =>
          state.filter(
            (cardItem) => cardItem._id !== confirmedCardForDelete._id
          )
        )
      )
      .catch((err) => console.log(err));
  }, [confirmedCardForDelete]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onAddCard={handleAddCardClick}
                onEditProfile={handleEditPtofileClick}
                onCardClick={handleCardClick}
                onCardLikeClick={handleLikeClick}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route exact path="/signup" element={<Register/>} />
          <Route exact path="/signin" element={<Login/>} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopup}
          onAddCard={handlePlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopup} />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopup}
          onConfirm={handleConfirm}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
