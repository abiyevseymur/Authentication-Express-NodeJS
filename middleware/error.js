const winston = require('winston');

module.exports = function(err,req,res,next){
    //log exception
    winston.error(err.message,err);
    //error
    //warn
    //info
    res.send(500,'something wrong: ' + err)
}