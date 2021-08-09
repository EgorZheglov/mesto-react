import './App.css';
import React from 'react';
import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import ProfileEditPopup from './ProfileEditPopup/ProfileEditPopup';
import PopupWithForm from './PopupWithForm/PopupWithForm';
import ImagePopup from './ImagePopup/ImagePopup';
import api from '../services/api';
import { UserContext } from '../contexts/CurrentUserContext';

function App() {
  
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  const [isImagePopupOpen, setImagePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setUser] = React.useState({})
  
  React.useState(()=>{
    api.getUserData()
    .then(res =>{
      setUser(res)
    })
  })

  function handleCardClick(card){
    setSelectedCard(card);
    toggleImagePopup();
  }

  function toggleAddPlace(){
    setAddPlacePopup(true);
  }

  function toggleEditAvatar(){
    setAvatarPopup(true);
  }

  function toggleEditProfile(){
    setEditProfile(true);
  }

  function toggleImagePopup(){
    setImagePopup(true);
  }

  function closeAllPopups(){
    setImagePopup(false);
    setAddPlacePopup(false);
    setAvatarPopup(false);
    setEditProfile(false);
    setSelectedCard(null)
  }
  
  function handleUplateUser(name, about){
    api.sendUserData(name, about)
      .then((res) =>{
        setUser(res)
      })

  }

  return (
    <div className="page">
    <Header />
    <UserContext.Provider value={currentUser}>
      <Main handleCardClick={handleCardClick} onEditProfile={toggleEditProfile} onAddPlace={toggleAddPlace} onEditAvatar={toggleEditAvatar}/>
      <Footer />
      <ProfileEditPopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUplateUser}/>
    </UserContext.Provider>
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
    <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} selectedCard={selectedCard}/>
    </div>
  );
}

export default App;

//Большое спасибо за подробные комментарии!