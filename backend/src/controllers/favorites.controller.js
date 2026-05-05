const {
    addFavorite,
    getFavoritesByUser,
    deleteFavorite
} = require('../db/favorites');

//POST
const createFavorite = async (req, res) =>
    try {
        const userId = req.user.userId;
        const { animal_id } = req.body;

        if (!animal_id) {
            return res.status(400).json({ error: 'animal_id is required' });
        }

        const favorite = await addFavorite(userId, animal_id);

//Duplicate favorite handled idempotently
// ON CONFLICT DO NOTHING returns no row send 200

        if (!favorite) {
            return res.status(200).json({ message: 'Already favorited' });
        }

        return res.status(201).json(favorite);

    } catch (error) {
        console.error('Create favorite error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// GET/api/favorites

const getFavorites = async (req, res) => {
    try {
        const userId = req.user.userId;

        const favorites = await getFavoritesByUser(userId);

        return res.status(200).json(favorites);

    }   catch (error) {
        console.error('Get favorites error:', error);
    }
};

//Delete /api/favorites/:animalId

const removeFavorite = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { animalId } = req.params;

        const deleted = await deleteFavorite(userId, animalId);

        if (!deleted) {
            return res.status(404).json({ error: 'Favorite not found' });
        }
         return res.status(200).json ({ message: 'Favorite removed' });

    }   catch (error) {
        console.error('Remove favorite error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};







    }
}