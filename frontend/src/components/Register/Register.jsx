import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

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

    onRegister(formData)
      .catch(err => {
        setError(err.message || 'Error al registrarse');
      });
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Registrate</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth__input"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="auth__input"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <span className="auth__error">{error}</span>}
        <button type="submit" className="auth__submit">Registrate</button>
      </form>
      <p className="auth__link-text">
        ¿Ya eres miembro? <Link to="/signin" className="auth__link">Inicia Sesión aquí</Link>
      </p>
    </div>
  );
};

export default Register;