import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HeaderAuth from './components/Header/HeaderAuth';
import InfoTooltip from './components/InfoTooltip/InfoTooltip';
import { checkAuthToken, login as authLogin, register as authRegister } from './utils/auth';
import './index.css';

function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    isSuccess: false,
    message: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkAuthToken(token)
        .then((userData) => {
          setLoggedIn(true);
          const email = userData.email || '';
          setUserEmail(email);
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
          localStorage.removeItem('jwt');
          setLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setLoggedIn(false);
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (loginData) => {
    return authLogin(loginData.email, loginData.password)
      .then((data) => {
        setLoggedIn(true);
        const email = data.data?.email || data.email || loginData.email;
        setUserEmail(email);
        return data;
      })
      .catch((error) => {
        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message: error.message || 'Uy, algo salió mal. Por favor, inténtalo de nuevo.'
        });
        throw error;
      });
  };

  const handleRegister = (registerData) => {
    return authRegister(registerData.email, registerData.password, registerData.name)
      .then((data) => {
        setInfoTooltip({
          isOpen: true,
          isSuccess: true,
          message: '¡Correcto! Ya estás registrado.'
        });
        return authLogin(registerData.email, registerData.password);
      })
      .then((data) => {
        setLoggedIn(true);
        const email = data.data?.email || data.email || registerData.email;
        setUserEmail(email);
        return data;
      })
      .catch((error) => {
        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message: error.message || 'Uy, algo salió mal. Por favor, inténtalo de nuevo.'
        });
        throw error;
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
  };

  const closeInfoTooltip = () => {
    setInfoTooltip({
      isOpen: false,
      isSuccess: false,
      message: ''
    });

    if (infoTooltip.isSuccess && window.location.pathname === '/signup') {
      window.location.href = '/signin';
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={
          loggedIn ? <Navigate to="/" replace /> : (
            <>
              <HeaderAuth />
              <Login onLogin={handleLogin} />
              <InfoTooltip
                isOpen={infoTooltip.isOpen}
                onClose={closeInfoTooltip}
                isSuccess={infoTooltip.isSuccess}
                message={infoTooltip.message}
              />
            </>
          )
        } />
        <Route path="/signup" element={
          loggedIn ? <Navigate to="/" replace /> : (
            <>
              <HeaderAuth />
              <Register onRegister={handleRegister} />
              <InfoTooltip
                isOpen={infoTooltip.isOpen}
                onClose={closeInfoTooltip}
                isSuccess={infoTooltip.isSuccess}
                message={infoTooltip.message}
              />
            </>
          )
        } />
        <Route path="/" element={
          <ProtectedRoute
            element={App}
            loggedIn={loggedIn}
            userEmail={userEmail}
            onLogout={handleLogout}
          />
        } />
        <Route path="*" element={<Navigate to={loggedIn ? "/" : "/signin"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);