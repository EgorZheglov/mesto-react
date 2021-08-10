

function PopupWithForm (props){
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-opened' : ' '}`}>
          <div className="popup__container">
              <button className="popup__close popup__close_edit link" onClick={props.onClose} type="button"></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className = "popup__form popup__form_edit" name = {`${props.name}Form`} onSubmit = {props.onSubmit}>
                    {props.children}
                    <button className = "popup__save-button" type = "submit">Сохранить</button>
                </form>
      </div>
    </div>
    )
}

export default PopupWithForm