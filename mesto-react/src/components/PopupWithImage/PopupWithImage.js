

function PopupWithImage (props){
    return(
      <div className="popup popup_type_photo">
          <div className="popup__photo-container">
          <button className="popup__close popup__close_photo link" type="button"></button>
          <img className="popup__photo" src="#" alt="1" />
          <h3 className="popup__photo-title">text content</h3>
        </div>
      </div>
    )
}

export default PopupWithImage