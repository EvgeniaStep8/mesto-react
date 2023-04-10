import React from 'react';

export default function Card(props) {
  return (
    <article className='card'>
        <img className='card__image' src={props.link} alt={props.title}/>
        <button className='card__delete' type='button'></button>
        <div className='card__container'>
          <h2 className='card__title'>{props.title}</h2>
          <div className='card__like-container'>
            <button className='card__like' type='button'></button>
            <p className='card__like-counter'></p>
          </div>
        </div>
      </article>
  )
}