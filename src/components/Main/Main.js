import vector from '../../images/Vector1.svg';
import cross from '../../images/cross.svg';
import React from 'react';
import Card from '../Card/Card';
import api from '../../services/api'
import { UserContext } from '../../contexts/CurrentUserContext';


function Main (props){

  const currentUser = React.useContext(UserContext);

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [avatar, setUserAvatar] = React.useState('');
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
    
    let method = isLiked ? 'DELETE' : 'PUT';

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, method)
      .then((newCard) => {
         setCards((state) => {
           return state.map((c) => c._id === card._id ? newCard : c)//вставляем обновленную карточку
         });
    });
  } 
   

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
         setCards((state) => {
           return state.filter((c) => c._id !== card._id )//вставляем обновленную карточку
         });
    });
  } 

  return(
    <div className="main">
      <section className="profile">
        <div className="profile__info">
          <button className='profile__avatar-button link' onClick={props.onEditAvatar} type='button'>
              <img className="profile__img" src={currentUser.avatar} alt="Фото профиля" />
              <div className='profile__avatar-icon'>
              </div>
          </button>
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button link" onClick={props.onEditProfile} type="button"><img className="profile__edit-img" src={vector} alt="Редактировать профиль" /></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button link" onClick={props.onAddPlace} type="button">
          <img className="profile__cross" src={cross} alt="Добавить изображение" />
        </button>
        </section>
        <section className="elements">
          {initialCards.map((card) => (
            <Card key={card._id} data={card} handleCardClick={props.handleCardClick} onDeleteClick={handleCardDelete} onLikeClick={handleCardLike}/>//Нет точной уверенности, что этот ключ подойдет.
          ))}
        </section>
    </div>
    )
}

export default Main