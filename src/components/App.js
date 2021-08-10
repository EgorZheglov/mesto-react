import './App.css';
import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './ProfileEditPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditAvatarPopup from './EditAvatarPopup';
import { UserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup'

function App() {
  
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  const [isImagePopupOpen, setImagePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setUser] = React.useState({name:'', about: ''})
  const [initialCards, setCards] = React.useState([]);

  
  React.useEffect(() => {
      api.getInitialCards()
      .then(res =>{
        setCards(res)
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    
    const method = isLiked ? 'DELETE' : 'PUT';

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, method)
      .then((newCard) => {
         setCards((state) => {
           return state.map((c) => c._id === card._id ? newCard : c)//вставляем обновленную карточку
         });
    });
  } 
  
  React.useState(()=>{
    api.getUserData()
    .then(res =>{
      setUser(res)
    })
  },[])

  function handleCardClick(card){
    setSelectedCard(card);
    toggleImagePopup();
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
         setCards((state) => {
           return state.filter((c) => c._id !== card._id )//вставляем обновленную карточку
         });
    });
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
  
  function handleUpdateUser(name, about){
    api.sendUserData(name, about)
      .then((res) =>{
        setUser(res);
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(link){
    api.sendUserAvatar(link)
      .then((res) =>{
        setUser(res);
        closeAllPopups();
      })
  }

  function handleAddCard(name, link){
    api.sendCardInfo(name, link)
      .then((newCard) =>{
        setCards([newCard, ...initialCards]);
        closeAllPopups();
      })
  }

  return (
    <div className="page">
    <Header />
    <UserContext.Provider value={currentUser}>
      <Main 
        handleCardClick={handleCardClick} 
        onEditProfile={toggleEditProfile} 
        onAddPlace={toggleAddPlace} 
        onEditAvatar={toggleEditAvatar}
        cards={initialCards}
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}/>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
    </UserContext.Provider>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>
    <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups}>
      <button className = "popup__save-button" type = "submit">Да</button>
    </PopupWithForm>    
    <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} selectedCard={selectedCard}/>
    </div>
  );
}

export default App;

//Большое спасибо за подробные комментарии!