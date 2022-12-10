import logo from '../images/header__logo.svg'
import { Route, Link, useHistory, Switch } from 'react-router-dom'

function Header({ email, onClick }) {

    const history = useHistory()

    function signOut() {
        onClick()
    }

    return (
        <header className="header">
            <Link to="/" className="header__logo" style={{ backgroundImage: `url(${logo})` }}></Link>
            <Switch>
                <Route exact path="/">
                    <div className='header__wrapper'>
                        <p className='header__user'>{email}</p>
                        <button className='header__logout' onClick={signOut}>Выйти</button>
                    </div>
                </Route>

                <Route path="/signup">
                    <Link className="header__auth-link" to="signin">Войти</Link>
                </Route>

                <Route path="/signin">
                    <Link className="header__auth-link" to="signup">Регистрация</Link>
                </Route>
            </Switch>
        </header>
    )
}

export default Header

