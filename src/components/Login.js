
function Login (){
    return(
        <form className='sign'>
            <h1 className = "sign__title">Вход</h1>
            <input className = "sign__input" type = "email"  name="emailInput" id="email_input" placeholder='email' required />
            
            <input className = "sign__input" type = "password" name="passwordInput"  placeholder='Пароль' id="password_input" minLength="2" maxLength="20" required />
          
            <button className = "sign__button link" type = "submit">Войти</button> 
        </form>
    )
}

export default Login