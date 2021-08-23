
function SignUp (){
    return(
        <form className='sign'>
            <h1 className = "sign__title">Регистрация</h1>
            <input className = "sign__input" type = "email"  name="emailInput" id="email_input" placeholder='email' required />
            
            <input className = "sign__input" type = "password" name="passwordInput"  placeholder='Пароль' id="password_input" minLength="2" maxLength="20" required />
          
            <button className = "sign__button link" type = "submit">Зарегистрироваться</button> 
            <p>Уже зарегестрированы? <button className="sign__link link"> Войти</button></p>
        </form>
    )
}

export default SignUp