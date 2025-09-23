import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    onLogin(formData)
      .catch(err => {
        setError(err.message || 'Error al iniciar sesión');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Iniciar sesión</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth__input"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          name="password"
          className="auth__input"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {error && <span className="auth__error">{error}</span>}
        <button
          type="submit"
          className={`auth__submit ${isLoading ? 'auth__submit_loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
      <p className="auth__link-text">
        ¿Aún no eres miembro? <Link to="/signup" className="auth__link">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;