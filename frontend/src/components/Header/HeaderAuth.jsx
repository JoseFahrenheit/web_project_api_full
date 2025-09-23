import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/Vector.png';
import './HeaderAuth.css';

const HeaderAuth = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <img
          src={logo}
          alt="Around The U.S."
          className="nav__vector"
        />
        <div className="nav__link-container">
          {location.pathname === '/signin' ? (
            <Link to="/signup" className="nav__link">Registrate</Link>
          ) : (
            <Link to="/signin" className="nav__link">Iniciar sesión</Link>
          )}
        </div>
        <img
          src="/images/Line.png"
          alt="Separador"
          className="nav__linea"
        />
      </nav>
    </header>
  );
};

export default HeaderAuth;