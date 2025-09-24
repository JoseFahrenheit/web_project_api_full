const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const path = require('path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users.js');
const auth = require('./middleware/auth.js');
const errorHandler = require('./middleware/errorHandler.js');
const { userSchema, loginSchema } = require('./middleware/validation.js');
const requestLogger = require('./middleware/requestLogger.js');
const logger = require('./utils/logger.js');

const app = express();
const PORT = 3000;

const fs = require('fs');
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
  logger.info('Directorio de logs creado');
}

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info('Conexión exitosa a MongoDB');
  })
  .catch((err) => {
    logger.error('Error al conectar a MongoDB', { error: err.message });
  });

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(cors());
app.use(requestLogger);
app.use(express.json());

app.post('/signin', loginSchema, login);
app.post('/signup', userSchema, createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});