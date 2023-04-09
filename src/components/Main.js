import avatar from '../images/profile__avatar.jpg';

export default function Main(props) {
  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__container'>
          <button
            className='profile__change-avatar-button'
            type='button'
            onClick={props.onEditAvatar}
          >
            <img className='profile__avatar' src={avatar} alt='Фотография профиля' />
          </button>
          <div className='profile__info'>
            <h1 className='profile__name'>Жак-Ив Кусто</h1>
            <button
              className='profile__edit-button'
              type='button'
              onClick={props.onEditProfile}
            ></button>
            <p className='profile__job'>Исследователь океана</p>
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
