const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const validateObjectId = require('../middleware/validaeObjectId');


router.get('/',  async (req, res) => {
    const genre = await Genre
        .find()
        .select('name -_id genre.name -_id');

    res.send(genre)

});
router.get('/:id',validateObjectId, async (req, res) => {


    const genre = await Genre.find({_id:req.params.id});

    if (!genre) return res.status(404).send('The genre with this ID not found');

    res.send(genre);
})
router.post('/', auth, async (req, res) => {
    const genre = new Genre({
        name: req.body.name,
    })
    const result = await genre.save();
    res.send(result)

});
router.delete('/:id', [auth, admin], async (req, res) => {

    const genre = await Genre.deleteOne(req.params.id);

    if (!genre) return res.status(404).send('The genre with this ID not found');

    res.send(genre);
})

module.exports = router;