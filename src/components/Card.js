import React from "react";

export default function Card(props) {
  const handleClick = () => {
    props.onCardClick({
      name: props.card.name,
      link: props.card.link,
      isSelected: true,
    });
  };

  return (
    <article className="card">
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button className="card__delete" type="button"></button>
      <div className="card__container">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button className="card__like" type="button"></button>
          <p className="card__like-counter"></p>
        </div>
      </div>
    </article>
  );
}