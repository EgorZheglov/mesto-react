import trash1 from '../../images/delete1.svg'
import trash2 from '../../images/delete2.svg'

function Card (props){

    let card = props.data;

    return(
        <div class="elements__item">
          <button class="elements__popup-button" type="button">
            <img class="elements__photo link" src={card.link} alt="1"/>
          </button>
          <div class="elements__description-content">
          <h2 class="elements__title">{card.name}</h2>
          <div class='elements__like'>
            <button class="elements__like-button link elements__link" type="button"></button>
            <div class='elements__like-quantity'>{card.likes.length}</div>
            </div>
          </div>
          <button class="elements__delete-button link" type="button">
            <img class="elements__delete-img" src={trash1} alt="удалить"/>
            <img class="elements__trash-img" src={trash2} alt="удалить"/>
          </button>
        </div>
    )
}

export default Card;