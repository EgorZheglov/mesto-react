import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { UserContext } from '../../contexts/CurrentUserContext';

function ProfileEditPopup(props){

    const currentUser = React.useContext(UserContext);

    const [name, setName] =React.useState('')
    const [description, setDescription] =React.useState('')

    function handleChangeName(e) {
      setName(e.target.value);
    }

    function handleChangeDescription(e) {
      setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);  

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        console.log(1)
        e.preventDefault();
        props.onUpdateUser(name, description);
    }

    return(
      <PopupWithForm name="edit" title="Редактировать профиль" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
        <input className = "popup__input" type = "text" onChange={handleChangeName} value={name} name="nameInput" id="name_input" minLength="2" maxLength="40" required />
        <span className = "popup__input-error" id="name_input-error"></span>
        <input className = "popup__input" type = "text" name="professionInput" onChange={handleChangeDescription} value={description} id="profession_input" minLength="2" maxLength="200" required />
        <span className = "popup__input-error" id="profession_input-error"></span>
        <button className = "popup__save-button" type = "submit">Сохранить</button>
      </PopupWithForm>)
}

export default ProfileEditPopup;