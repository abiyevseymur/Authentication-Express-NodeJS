const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/movies')
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.error('here is error', err));


const courseSchema = new mongoose.Schema({
    name:{type:String,
        required:true,
        minlength:5},
    // author:String,
    // category:{
    //     type:String,
    //     required:true,
    //     enum:['web','mobile','network'],
    // },
    // tags:[String],
    // data:{type:Date,default:Date.now},
    // price:{type:Number,
    // required:function(){return this.isPublished},
    // min:0,
    // max:10000,
    // },
    // isPublished:Boolean
})
const Course = mongoose.model('Genre',courseSchema);
async function createCourse(){
    const course = new Genre({
        name:'Horor',
        // author:'Seymur',
        // category:'mobile',
        // tags:['teach','node'],
        // price:15,
        // isPublished:true
    })
    try {
    const result = await course.save();
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}
createCourse()
async function getCourses(){
    const pageNumber = 1;
    const pageSize = 10;
    const courses = await Course
    // .find({author:"Mosh"})
    // .skip((pageNumber-1)*pageSize)
    // .limit(pageSize)
    // .find({price:{$gte:10,$lte: 20}})
    // .find({_id:"5e598a4f8875591a06da0429"})
    // .and([{author:'Mosh'},{price:null}])
    // .limit(10)
    // .sort({name:1})
    // .count()
    // .select({name:1,tags:1});
    console.log(courses);
}
// getCourses()
async function updateCourse(id){
    const course = await Course.updateOne({_id:id},{
        $set:{
            author:'Seymur',
            price:5
        }
    });
   
    console.log(course);
}
// updateCourse("5e598a4f8875591a06da0429")

async function removeCourse(id){
    const course = await Course.deleteOne({_id:id});
   
    console.log(course);
}
 module.exports =db;