const mongoose = require('mongoose');
const validator = require('validator');

const validateUrl = (url) => {
  const regex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  return regex.test(url);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [30, 'El nombre debe tener un maximo de 30 caracteres'],
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: [2, 'La descripcion debe tener al menos 2 caracteres'],
    maxlength: [30, 'La descripcion debe tener un maximo de 30 caracteres'],
  },
  avatar: {
    type: String,
    validate: {
      validator: function(v) {
        return v === '' || /^https?:\/\/.+/i.test(v);
      },
      message: 'La URL del avatar no es valida',
    },
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'El formato del email no es válido'
    }
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    select: false
  }
});

module.exports = mongoose.model('User', userSchema);