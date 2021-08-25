import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api, signApi} from '../utils/api';
import Register from './Register';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import EditAvatarPopup from './EditAvatarPopup';
import { UserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup'
import InfoTooltip from './InfoTooltip'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute';

function App() {
  
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  const [isImagePopupOpen, setImagePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setUser] = React.useState({name:'', about: ''})
  const [initialCards, setCards] = React.useState(null);
  const [loggedIn, setLogIn] = React.useState(false);
  const [isRegistrationPopupOpen, setRegistrationPopup] = React.useState(false);
  const [signSuccsess, setSignSucces] = React.useState(true);

  const history = useHistory();

  
  
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
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  } 

  React.useEffect(()=>{
    api.getUserData()
    .then(res =>{
      setUser(res)
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`)
    })

    api.getInitialCards()
      .then(res =>{
        setCards(res)
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  },[])

  function handleSignUpSubmit(email, password){
    signApi.signUp(email, password)
    .then(res => {
      setSignSucces(true);
      setRegistrationPopup(true);
      history.push('/signin')
    })
    .catch(err => {
      setSignSucces(false)
      setRegistrationPopup(true);
    })
  }

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
    })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
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

  function togglRegistrationPopup(){
    setRegistrationPopup(true);
  }

  function closeAllPopups(){
    setImagePopup(false);
    setAddPlacePopup(false);
    setAvatarPopup(false);
    setEditProfile(false);
    setSelectedCard(null);
    setRegistrationPopup(false)
  }
  
  function handleUpdateUser(name, about){
    api.sendUserData(name, about)
      .then((res) =>{
        setUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleUpdateAvatar(link){
    api.sendUserAvatar(link)
      .then((res) =>{
        setUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleAddCard(name, link){
    api.sendCardInfo(name, link)
      .then((newCard) =>{
        setCards([newCard, ...initialCards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }

  return (
    <div className="page">
    <Header />
    <UserContext.Provider value={currentUser}>
    <Switch>
      <ProtectedRoute 
          path='/profile'
          component={Main}  
          loggedIn = {loggedIn}  
          handleCardClick={handleCardClick} 
          onEditProfile={toggleEditProfile} 
          onAddPlace={toggleAddPlace} 
          onEditAvatar={toggleEditAvatar}
          cards={initialCards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}/>  
      <Route path='/sign-up'>
        <Register onSignUp = {handleSignUpSubmit}/>
      </Route>
      <Route path='/sign-in'>
         <Login />  
      </Route>
      <Route>
          {!loggedIn ? (<Redirect to="/profile" />) : (<Redirect to="/sign-up" />)}
      </Route>
    </Switch>
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>  
    </UserContext.Provider>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>
    <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups}>
          <button className = "popup__save-button" type = "submit">Да</button>
        </PopupWithForm>    
    <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} selectedCard={selectedCard}/>
    <InfoTooltip onClose={closeAllPopups} isSuccesed={signSuccsess} isOpen={isRegistrationPopupOpen}/>
    <Footer />
    </div>
  );
}

export default App;

//Еще раз спасибо большое!
