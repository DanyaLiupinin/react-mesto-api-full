import React from "react"
import { Link } from "react-router-dom"
import * as mestoAuth from '../utils/mestoAuth';

function Register({ onSubmit }) {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(password, email)
    }

    return (
        <div className="account">
            <h1 className="popup__title popup__title_type_auth account__title">Регистрация</h1>
            <form className="account__form" onSubmit={handleSubmit}>
                <div className="account__input-field">
                    <input className="account__input" id="registration-email" name="registration-email" type="email" value={email} //required 
                        placeholder="Email" onChange={handleEmailChange} />
                    <span className="account__input-error" id="error-name"></span>
                </div>
                <div className="account__input-field">
                    <input className="account__input" id="registration-password" name="registration-password" type="password" minLength='5' maxLength='15' value={password} onChange={handlePasswordChange} //required 
                        placeholder="Пароль" />
                    <span className="account__input-error" id="error-name"></span>
                </div>
                <button type="submit" className="account__submit-button account__submit-button_active">Зарегистрироваться</button>
            </form>
            <Link to="signin" className="account__form-caption">Уже зарегестрированы? Войти</Link>
        </div>
    )
}

export default Register
