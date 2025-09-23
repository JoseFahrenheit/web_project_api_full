const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const requestData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    query: req.query && Object.keys(req.query).length > 0 ? req.query : undefined,
    body: req.body && Object.keys(req.body).length > 0 ? req.body : undefined
  };

  logger.info('Request received', requestData);

  const originalSend = res.send;
  res.send = function(body) {
    logger.info('Response sent', {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime: `${Date.now() - req.startTime}ms`
    });

    return originalSend.call(this, body);
  };

  req.startTime = Date.now();
  next();
};

module.exports = requestLogger;