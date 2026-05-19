const Joi = require('joi');
const BadRequestError = require('../errors/bad-request');
const passwordRegex = '^[a-zA-Z0-9]{3,30}$';

const validateRegisterInput = (req, res, next) => {
  const { name, email, password } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
  });
  const valid = schema.validate({ name, email, password });
  if (valid.error) {
    throw new BadRequestError(valid.error);
  }
  next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
  });
  const valid = schema.validate({ email, password });
  if (valid.error) {
    throw new BadRequestError(valid.error);
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
    throw new BadRequestError(valid.error);
  }
  next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateFavoriteInput,
};
