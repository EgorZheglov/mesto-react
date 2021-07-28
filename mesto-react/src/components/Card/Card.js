import trash1 from '../../images/delete1.svg'
import trash2 from '../../images/delete2.svg'

function Card (props){

    let card = props.data;

    function handleClick() {
      props.handleCardClick(card);
    }  

    return(
        <div className="elements__item">
          <button className="elements__popup-button" type="button" onClick={handleClick}>
            <img className="elements__photo link" src={card.link} alt="1"/>
          </button>
          <div className="elements__description-content">
          <h2 className="elements__title">{card.name}</h2>
          <div className='elements__like'>
            <button className="elements__like-button link elements__link" type="button"></button>
            <div className='elements__like-quantity'>{card.likes.length}</div>
            </div>
          </div>
          <button className="elements__delete-button link" type="button">
            <img className="elements__delete-img" src={trash1} alt="удалить"/>
            <img className="elements__trash-img" src={trash2} alt="удалить"/>
          </button>
        </div>
    )
}

export default Card;