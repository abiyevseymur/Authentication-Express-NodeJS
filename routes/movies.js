
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movies');
const { Genre } = require('../models/genre')

router.get('/:name', async (req, res) => {

    const movie = await Movie
        .find({ name: req.params.name })

    if (!movie || movie == 0) return res.status(404).send('The movie was not found')

    res.send(movie)


});
router.post('/', async (req, res) => {
    const genre = await Genre.findById(req.body.genreId);
    const movie = new Movie({
        name: req.body.name, 
        genre: {
            _id: genre._id,
            name: genre.name
        }
    })

    try {
        const result = await movie.save();
        res.send(result)
    } catch (error) {
        res.send(error.message)
    }
})
router.put('/:id', async (req, res) => {

    try {
        const movie = await Movie.updateOne({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                genre: req.body.genre
            }
        });
        res.send(movie)
    } catch (error) {
        res.send(error.message)
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.deleteOne({ _id: req.params.id });
        res.send(movie);

    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;