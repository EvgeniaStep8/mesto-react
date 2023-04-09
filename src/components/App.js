import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  const handleEditAvatarClick = ()=> {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  const handleAddCardClick = ()=> {
    setAddCardPopupOpen(!isAddCardPopupOpen);
  }
  const handleEditPtofileClick = ()=> {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  const closeAllPopup = () => {
    setEditAvatarPopupOpen(false);
    setAddCardPopupOpen(false);
    setEditProfilePopupOpen(false);
  }


  return (
    <div className='app'>
      <Header />
      <Main 
        onEditAvatar={handleEditAvatarClick}
        onAddCard={handleAddCardClick}
        onEditProfile={handleEditPtofileClick}
      />
      <Footer />
      <PopupWithForm
        name='edit-profile'
        title='Редактировать профиль'
        buttonText='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
        inputs= {[
          {
            name: 'name',
            type: 'text',
            placeholder: 'Имя',
          },
          {
            name: 'about',
            type: 'text',
            placeholder: 'О себе',
          }
        ]}
      />
      <PopupWithForm
        name='add-card'
        title='Новое место'
        buttonText='Создать'
        isOpen={isAddCardPopupOpen}
        onClose={closeAllPopup}
        inputs= {[
          {
            name: 'title',
            type: 'text',
            placeholder: 'Название',
          },
          {
            name: 'link',
            type: 'url',
            placeholder: 'Ссылка на картинку',
          }
        ]}
      />
      <PopupWithForm
        name='update-avatar'
        title='Обновить аватар'
        buttonText='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
        inputs= {[
          {
            name: 'link-avatar',
            type: 'url',
            placeholder: 'Ссылка на картинку профиля',
          }
        ]}
      />
      <PopupWithForm
        name= 'confirm'
        title='Вы уверены?'
        buttonText='Да'
      />
      <ImagePopup />
    </div>
  );
}

export default App;
