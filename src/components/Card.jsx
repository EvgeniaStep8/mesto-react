import React from "react";

export default function Card({ card, isOwnerCard, isLiked, onCardClick }) {
  const handleClick = () => {
    onCardClick({
      name: card.name,
      link: card.link,
      isSelected: true,
    });
  };

  return (
    <article className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwnerCard && <button className="card__delete" type="button"></button>}
      <div className="card__container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={`card__like ${isLiked && 'card__like_active'}`}
            type="button"
          >
          </button>
          <p className="card__like-counter"></p>
        </div>
      </div>
    </article>
  );
}