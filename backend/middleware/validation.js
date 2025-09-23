const validator = require('validator');
const { Joi, celebrate } = require('celebrate');

const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
};

const userSchema = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).default('Jacques Cousteau'),
        about: Joi.string().min(2).max(30).default('Explorador'),
        avatar: Joi.string().custom(validateURL).allow(''),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })
});

const loginSchema = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
});

const userUpdateSchema = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30)
    })
});

const avatarUpdateSchema = celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().required().custom(validateURL)
    })
});

const cardSchema = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().custom(validateURL)
    })
});

const objectIdSchema = celebrate({
    params: Joi.object().keys({
        userId: Joi.string().hex().length(24),
        cardId: Joi.string().hex().length(24)
    })
});

module.exports = {
    validateURL,
    userSchema,
    loginSchema,
    userUpdateSchema,
    avatarUpdateSchema,
    cardSchema,
    objectIdSchema
};