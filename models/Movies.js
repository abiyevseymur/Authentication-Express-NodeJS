const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    name:{type:String,
        required:true,
        minlength:5},
 
    genre:{
        type:genreSchema,
        required:true,
    },
    data:{type:Date,default:Date.now}
}))

module.exports = Movie