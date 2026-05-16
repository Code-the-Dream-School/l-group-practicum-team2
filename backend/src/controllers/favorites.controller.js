const {
  addFavorite,
  getFavoritesByUser,
  deleteFavorite,
} = require('../db/favorites');

const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

// POST /api/favorites
const createFavorite = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { animal_id } = req.body;

    if (!animal_id) {
      throw new BadRequestError('animal_id is required');
    }

    const favorite = await addFavorite(userId, animal_id);

    // Duplicate favorite handled idempotently
    if (!favorite) {
      throw new BadRequestError('Animal is already in favorites');
    }

    return res.status(StatusCodes.CREATED).json(favorite);
  } catch (error) {
    next(error);
  }
};

// GET /api/favorites
const getFavorites = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const favorites = await getFavoritesByUser(userId);

    return res.status(StatusCodes.OK).json(favorites);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/favorites/:animalId
const removeFavorite = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { animalId } = req.params;

    const deleted = await deleteFavorite(userId, animalId);

    if (!deleted) {
      throw new NotFoundError('Favorite not found');
    }

    return res.status(StatusCodes.OK).json({ message: 'Favorite removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFavorite,
  getFavorites,
  removeFavorite,
};
