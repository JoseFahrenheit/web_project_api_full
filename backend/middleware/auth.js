const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-dev';

const auth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorizacion requerido' });
    }

    const token = authorization.replace('Bearer ', '');

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token invalido'});
        }
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token expirado' });
        }
        res.status(401).json({ message: 'Error de Autorizacion' });
    }
};

module.exports = auth;