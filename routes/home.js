const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../models/Movies');


router.get('/',async (req,res)=>{
    const movies = await Movie
    .find()
    .select('name -_id genre.name -_id');
    res.send(movies)
});

module.exports = router;