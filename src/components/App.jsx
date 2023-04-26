import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
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
  const [isPending, setPending] = useState(false);
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

  const changePending = useCallback(() => {
    setPending((state) => !state);
  }, []);

  const handleUpdateUser = useCallback(
    (userInfo) => {
      api
        .patchUserInfo(userInfo)
        .then((user) => {
          setCurrentUser(user);
          closeAllPopup();
        })
        .catch((err) => console.log(err))
        .finally(() => setPending(false));
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
    (card) => {
      return api
        .postCard(card)
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
        <Main
          cards={cards}
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
