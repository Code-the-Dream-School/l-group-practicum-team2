const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAnimals = async (req, res) => {
  

        let {extraLove} = req.query;
        let query = "SELECT * FROM animals";

        if(extraLove){
            query += `WHERE special_needs=TRUE`;
        }
        const result = await pool.query(query);
        const animals = result.rows;
        
        res.status(StatusCodes.OK).json({animals, 'count': animals.length});


};