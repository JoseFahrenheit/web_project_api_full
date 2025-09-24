import { setApiToken, removeApiToken } from './Api.jsx';

const AUTH_BASE_URL = import.meta.env.MODE === 'production' ? '' : 'http://localhost:3000';

export const register = async (email, password, name) => {
  try {

    const response = await fetch(`${AUTH_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = 'Error en el registro';
      if (response.status === 400) {
        errorMessage = 'Uno de los campos se rellenó de forma incorrecta';
      } else if (data.message) {
        errorMessage = data.message;
      }
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error en register:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {

    const response = await fetch(`${AUTH_BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorText = await response.text();
      throw new Error(`Server error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = 'Error en login';
      if (response.status === 400) {
        errorMessage = 'Credenciales invalidas';
      } else if (response.status === 401) {
        errorMessage = 'Email o contraseña incorrectos';
      } else if (data.message) {
        errorMessage = data.message;
      }
      throw new Error(errorMessage);
    }

    if (data.token) {
      localStorage.setItem('jwt', data.token);
      setApiToken(data.token);
    }

    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

export const checkAuthToken = async (token) => {
  try {

    const response = await fetch(`${AUTH_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorText = await response.text();
      throw new Error(`Server error ${response.status}: ${errorText}`);
    }

    if (!response.ok) {
      throw new Error('Token invalido');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en checkAuthToken:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('jwt');
  removeApiToken();
};