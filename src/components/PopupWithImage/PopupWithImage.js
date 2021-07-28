

function PopupWithImage (props){
  
  const card = props.data;
  
    return(
      <div className= {`popup popup_type_photo ${props.isOpen ? 'popup_is-opened' : ' '}`}>
          <div className="popup__photo-container">
          <button className="popup__close popup__close_photo link" onClick={props.onClose} type="button"></button>
          <img className="popup__photo" src={`${card.link}`} alt="1" />
          <h3 className="popup__photo-title">{card.name}</h3>
        </div>
      </div>
    )
}

export default PopupWithImage