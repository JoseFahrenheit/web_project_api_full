const logger = require('../utils/logger.js');
const errorHandler = (err, req, res, next) => {
  logger.error('Error ocurred', {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip || req.connection.remoteAddress,
    errorMessage: err.message,
    errorStack: err.stack,
    statusCode: err.statusCode || 500
  });

  if (err.details) {
    const errorMessage = err.details.get('body') || err.details.get('params') || err.details.get('query');
    return res.status(400).json({
      message: 'Datos de entrada inválidos',
      details: errorMessage.details.map(detail => detail.message)
    });
  }

  const statusCode = err.statusCode || 500;

  const message = process.env.NODE_ENV === 'production'
    ? 'Error interno del servidor'
    : err.message;

  res.status(statusCode).json({
    message: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = errorHandler;