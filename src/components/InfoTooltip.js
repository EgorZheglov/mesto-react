import succes from '../images/succes.svg'
import error from '../images/error.svg'

function InfoTooltip (props){  
      return(
        <div className= {`popup popup_type_photo ${props.isOpen ? 'popup_is-opened' : ' '}`} onClick={props.onClose}>
            <div className="popup__container">
            <img className="popup__registration-image" src={succes}/>
            <button className="popup__close" onClick={props.onClose} type="button"></button>
            <h3 className="popup__title popup__registration-title">Вы успешно зарегестрировались!</h3>
          </div>
        </div>
      )
  }
  
  export default InfoTooltip