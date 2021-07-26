import vector from '../../images/Vector1.svg';
import cross from '../../images/cross.svg'

function Main (props){


    return(
    <div className="main">
      <section className="profile">
        <div className="profile__info">
          <button className='profile__avatar-button link' type='button'>
              <img className="profile__img" src="#" alt="Фото профиля" />
              <div className='profile__avatar-icon'>
              </div>
          </button>
          <div className="profile__title">
            <h1 className="profile__name"></h1>
            <button className="profile__edit-button link" type="button"><img className="profile__edit-img" src={vector} alt="Редактировать профиль" /></button>
            <p className="profile__profession"></p>
          </div>
        </div>
        <button className="profile__add-button link"  type="button">
          <img className="profile__cross" src={cross} alt="Добавить изображение" />
        </button>
        </section>
        <section className="elements">
        </section>
    </div>
    )
}

export default Main