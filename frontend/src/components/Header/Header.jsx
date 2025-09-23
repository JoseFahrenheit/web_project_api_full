import React from 'react';
import logo from '../../images/Vector.png';
import './Header.css';

function Header({ userEmail, onLogout }) {
  console.log('Header - userEmail:', userEmail);
  console.log('Header - tipo de userEmail:', typeof userEmail);

  return (
    <header className="header">
      <div className="header__container">
        <img
          src={logo}
          alt="Around The U.S."
          className="header__logo"
        />
        <div className="header__user-info">
          <span className="header__email debug">
            {userEmail ? userEmail : 'nocorreo@ejemplo.com'}
          </span>
          <span
            className="header__logout"
            onClick={onLogout}
          >
            Cerrar sesión
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;