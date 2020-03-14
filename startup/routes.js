const helmet = require('helmet');
const movies = require('../routes/movies');
const home = require('../routes/home.js');
const genre = require('../routes/genre.js');
const users = require('../routes/users.js');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const express = require('express');



module.exports = function(app){

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
//routes
app.use('/api/movies', movies);
app.use('/api/genre', genre);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);

app.use(error);
}