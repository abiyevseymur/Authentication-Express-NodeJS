const debug = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const Joi = require('joi');
const app = express();
const logger = require('./middleware/logger');
const morgan = require('morgan');
const helmet = require('helmet');
const movies = require('./routes/movies');
const home = require('./routes/home.js');
const genre = require('./routes/genre.js');
const users = require('./routes/users.js');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')){
    console.error('Fatal error: jwtPrivateKey is not defined..');
    process.exit(1);
}
// const db = require('./db/db');
// const mongoose = require('mongoose');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies')
    .then(() => console.log('connected to db...'))
    .catch((err) => console.error("couldn't connect to db:",err))

// mongoose.connect('mongodb://localhost/playground')
// .then(()=>console.log('connected to mongodb'))
// .catch((err)=>console.error('here is error' ,err));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(helmet());
//routes
app.use('/api/movies', movies);
app.use('/api/genre', genre);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('morgan enabled')
}



//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening ${port}...`))