
const winston = require("winston");
require("winston-mongodb");
require('express-async-errors');

process.on('uncaughtException', (ex) => {
    console.log('UNCOUGHT EXCEPTION!!')
    winston.error(ex)
})
winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtException.log" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
    );

winston.add(new winston.transports.File({
    filename: "logfile.log",
}));

winston.add(new winston.transports.MongoDB({ db: "mongodb://localhost/movies", level: "info" }));
