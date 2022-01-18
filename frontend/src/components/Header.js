import React from 'react';
import logo from '../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo"/>
      {
        props.loggedIn ? (
          <div className='header__info'>
            <p className='header__email'>{props.email}</p>
            <Link
              to='signup'
              className={`header__link ${props.loggedIn && 'header__link_active'}`}
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </div>
        ) :

        (<>
          {
            location.pathname === '/signin' ?
            <Link className='header__link' to='/signup'>Регистрация</Link> :
            <Link className='header__link' to='/signin'>Войти</Link>
          }
        </>)
      }

    </header>
  )
}

export default Header;
