
const debug = require('debug')('app:startup');
const express = require('express');
const app = express();
const morgan = require('morgan');
const winston = require('winston');

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();



if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('morgan enabled')
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening ${port}...`))