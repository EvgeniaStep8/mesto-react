import React, { useContext } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardsContext } from '../contexts/CurrentCardsContext';

export default function Main({onEditAvatar, onEditProfile, onAddCard, onCardClick}) {
  const currentUser = useContext(CurrentUserContext);
  const currentCards = useContext(CurrentCardsContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__change-avatar-button"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фотография профиля"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddCard}
        ></button>
      </section>
      <section className="cards">
        {currentCards?.map(card  => (
          <Card
            card = {card}
            key={card._id}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}