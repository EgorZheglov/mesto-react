import logo from '../logo.svg';
import './App.css';
import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import PopupWithForm from './PopupWithForm/PopupWithForm';
import PopupWithImage from './PopupWithImage/PopupWithImage';

function App() {
  return (
    <div className="page">
    <Header />
    <Main />
    <Footer />
    <PopupWithForm name="edit" title="Редактировать профиль">
      <input className = "popup__input" type = "text" name="nameInput" id="name_input" minLength="2" maxLength="40" required />
      <span className = "popup__input-error" id="name_input-error"></span>
      <input className = "popup__input" type = "text" name="professionInput" id="profession_input" minLength="2" maxLength="200" required />
      <span className = "popup__input-error" id="profession_input-error"></span>
      <button className = "popup__save-button" type = "submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="add" title="Добавить Фото">
      <input className = "popup__input" type = "text" name="photoNameInput" id="photo-name_input" placeholder="Название" minLength="2" maxLength="30"  required />
      <span className = "popup__input-error" id="photo-name_input-error"></span>
      <input className = "popup__input" type = "url" name="photoLinkInput" placeholder="Ссылка на картинку" id="photo-link_input"  required />
      <span className = "popup__input-error" id="photo-link_input-error"></span>
      <button className = "popup__save-button" type = "submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="avatar" title="Редактировать аватар">
      <input className = "popup__input" type = "url" name="avatarLinkInput" id="avatar_input" placeholder="Ссылка на картинку" minLength="2" maxLength="200" required />
      <span className = "popup__input-error" id="avatar_input-error"></span>
      <button className = "popup__save-button" type = "submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="delete" title="Вы уверены?">
      <button className = "popup__save-button" type = "submit">Да</button>
    </PopupWithForm>    
    <PopupWithImage />
    </div>
  );
}

export default App;
