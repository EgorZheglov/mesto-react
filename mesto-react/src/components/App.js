import logo from '../logo.svg';
import './App.css';
import React from 'react';
import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import PopupWithForm from './PopupWithForm/PopupWithForm';
import PopupWithImage from './PopupWithImage/PopupWithImage';
import api from '../servisces/api'

function App() {
  
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  
  

  function toggleAddPlace(){
    if(isAddPlacePopupOpen){
      setAddPlacePopup(false);
    } else {
      setAddPlacePopup(true);
    }
  }

  function toggleEditAvatar(){
    if(isEditAvatarPopupOpen){
      setAvatarPopup(false);
    } else {
      setAvatarPopup(true);
    }
  }

  function toggleEditProfile(){
    if(isEditProfilePopupOpen){
      setEditProfile(false);
    } else {
      setEditProfile(true);
    }
  }

function closeAllPopups(){
  setAddPlacePopup(false);
  setAvatarPopup(false);
  setEditProfile(false);
}
  

  return (
    <div className="page">
    <Header />
    <Main onEditProfile={toggleEditProfile} onAddPlace={toggleAddPlace} onEditAvatar={toggleEditAvatar}/>
    <Footer />
    <PopupWithForm name="edit" title="Редактировать профиль" onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}>
      <input className = "popup__input" type = "text" name="nameInput" id="name_input" minLength="2" maxLength="40" required />
      <span className = "popup__input-error" id="name_input-error"></span>
      <input className = "popup__input" type = "text" name="professionInput" id="profession_input" minLength="2" maxLength="200" required />
      <span className = "popup__input-error" id="profession_input-error"></span>
      <button className = "popup__save-button" type = "submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="add" title="Добавить Фото" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}>
      <input className = "popup__input" type = "text" name="photoNameInput" id="photo-name_input" placeholder="Название" minLength="2" maxLength="30"  required />
      <span className = "popup__input-error" id="photo-name_input-error"></span>
      <input className = "popup__input" type = "url" name="photoLinkInput" placeholder="Ссылка на картинку" id="photo-link_input"  required />
      <span className = "popup__input-error" id="photo-link_input-error"></span>
      <button className = "popup__save-button" type = "submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="avatar" title="Редактировать аватар" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
      <input className = "popup__input" type = "url" name="avatarLinkInput" id="avatar_input" placeholder="Ссылка на картинку" minLength="2" maxLength="200" required />
      <span className = "popup__input-error" id="avatar_input-error"></span>
      <button className = "popup__save-button" type = "submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups}>
      <button className = "popup__save-button" type = "submit">Да</button>
    </PopupWithForm>    
    <PopupWithImage onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
