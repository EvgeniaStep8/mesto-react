import React from 'react';
import avatar from '../images/profile__avatar.jpg';
import api from '../utils/api.js'

export default function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState({avatar});

  React.useEffect( () => {
    api.getUserInfo()
      .then(user => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__container'>
          <button
            className='profile__change-avatar-button'
            type='button'
            onClick={props.onEditAvatar}
          >
            <img className='profile__avatar' src={userAvatar} alt='Фотография профиля' />
          </button>
          <div className='profile__info'>
            <h1 className='profile__name'>{userName}</h1>
            <button
              className='profile__edit-button'
              type='button'
              onClick={props.onEditProfile}
            ></button>
            <p className='profile__job'>{userDescription}</p>
          </div>
        </div>
        <button
          className='profile__add-button'
          type='button'
          onClick={props.onAddCard}
          ></button>
      </section>
      <section className='cards'></section>
    </main>
  );
}
