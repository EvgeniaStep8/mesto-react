import React from "react";
import {useEffect, useState} from 'react';
import api from "../utils/api.js";
import Card from "./Card.js";

export default function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(initialCards.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__change-avatar-button"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={userAvatar}
              alt="Фотография профиля"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__job">{userDescription}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddCard}
        ></button>
      </section>
      <section className="cards">
        {cards?.map(card  => {
            return (
              <Card
                card = {card}
                key={card._id}
                onCardClick={props.onCardClick}
              />
            );
          })}
      </section>
    </main>
  );
}