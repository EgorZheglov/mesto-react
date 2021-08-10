import logo from '../images/Vector.svg'

function Header (props){
    return(
        <div className="header">
            <img className="header__logo" src={logo} alt="Лого"/>
        </div>
    )
}

export default Header
