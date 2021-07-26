import vector from '../../images/Vector1.svg';
import cross from '../../images/cross.svg';
import api from '../../servisces/api';
import React from 'react';
import Card from '../Card/Card';


function Main (props){

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [avatar, setUserAvatar] = React.useState('');
  const [initialCards, setInitialCards] = React.useState([]);

  
  React.useEffect(() => {
    api.getUserData()
      .then(res =>{
        setUserAvatar(res.avatar);
        setUserName(res.name)
        setUserDescription(res.about)
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })

      api.getInitialCards()
      .then(res =>{
        setInitialCards(res)
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  });

  

    return(
    <div className="main">
      <section className="profile">
        <div className="profile__info">
          <button className='profile__avatar-button link' onClick={props.onEditAvatar} type='button'>
              <img className="profile__img" src={avatar} alt="Фото профиля" />
              <div className='profile__avatar-icon'>
              </div>
          </button>
          <div className="profile__title">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button link" onClick={props.onEditProfile} type="button"><img className="profile__edit-img" src={vector} alt="Редактировать профиль" /></button>
            <p className="profile__profession">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button link" onClick={props.onAddPlace} type="button">
          <img className="profile__cross" src={cross} alt="Добавить изображение" />
        </button>
        </section>
        <section className="elements">
          {initialCards.map((card) => (
            <Card data={card} />
          ))}
        </section>
    </div>
    )
}

export default Main