import logo from '../images/Vector.svg'
import React from 'react'
import { Link, useHistory } from 'react-router-dom';

function Header (props){

    let linkText; //Если использовать useState, бесконечный перерендер
    let linkPath;

    const history = useHistory();

    if(history.location.pathname === '/sign-in'){
        linkText = 'Регистрация'
        linkPath = '/sign-up'
    }else{
        if(history.location.pathname === '/sign-up'){
            linkText = 'Вход'
            linkPath = '/sign-in'  
        }
    }

    return(
        <div className="header">
            <img className="header__logo" src={logo} alt="Лого"/>
            {props.isLoggedIn ? (
                <div className='header__info'>
                    <div className="header__email">{props.email}</div>
                    <button className = "header__button link" onClick={props.onLogOut} type = "submit">Выйти</button>
                </div>
                ): <Link to={linkPath} className = "header__button link">{linkText}</Link>}
                
        </div>
    )
}

export default Header
