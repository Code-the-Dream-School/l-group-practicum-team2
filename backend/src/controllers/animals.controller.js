const { StatusCodes } = require('http-status-codes');
const pool = require('../config/db.postgres')

const getAnimals = async (req, res, next) => {
  
    try{
        let {extraLove} = req.query;
        let query = "SELECT * FROM animals";

        if(extraLove){
            query += ` WHERE special_needs=TRUE`;
        }
        const result = await pool.query(query);
        const animals = result.rows;
        
        res.status(StatusCodes.OK).json({animals, 'count': animals.length});
    } catch(err){
        console.error(err);
        next(err);
    }

};

module.exports = { getAnimals };