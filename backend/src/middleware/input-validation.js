const Joi = require('joi');
const BadRequestError = require('../errors/bad-request');
const passwordRegex = '^[a-zA-Z0-9]{6,30}$';
const nameRegex = '^[a-zA-Z0-9 ._]{2,20}$'

const validateRegisterInput = (req, res, next) => {
  const { name, email, password } = req.body;
  const schema = Joi.object({
    name: Joi.string()
      .pattern(new RegExp(nameRegex))
      .required()
      .messages({
        "string.pattern.base": "Name must be between 2 and 20 characters and contain only letters, numbers, spaces, dots, or underscores."
      }),
    
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp(passwordRegex))
      .required()
      .messages({
        "string.pattern.base": "Password must be between 6 and 30 characters and contain only letters and numbers."
      })
  });
  const valid = schema.validate({ name, email, password });
  if (valid.error) {
    return next(new BadRequestError(valid.error.message));
  }
  next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
   
    });
  const valid = schema.validate({ email, password });
  if (valid.error) {
    return next(new BadRequestError(valid.error.message));
  }
  next();
};

const validateFavoriteInput = (req, res, next) => {
  const user_id = req.user.id;
  const { animal_id } = req.body;
  const uuidRegex =
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';
  //   check if animal id and user id exists in the database
  const schema = Joi.object({
    user_id: Joi.string().pattern(new RegExp(uuidRegex)).required(),
    animal_id: Joi.string().pattern(new RegExp(uuidRegex)).required(),
  });
  const valid = schema.validate({ user_id, animal_id });
  if (valid.error) {
    return next(new BadRequestError(valid.error.message));
  }
  next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateFavoriteInput,
};
