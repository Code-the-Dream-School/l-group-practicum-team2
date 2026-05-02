const express = require('express');
const router = express.Router();
const {

    getAnimals
    
} = require('../controllers/animals.controller')


//public 
// /animals?extraLove=true
router.get("/", getAnimals);


module.exports = router