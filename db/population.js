const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  const authorSchema = new mongoose.Schema({
    name:String,
    bio:String,
    website:String
  })

const Author = mongoose.model('Author',authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:[authorSchema]
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author','name -_id')
    // .populate('category','name')
    .select('name');
  console.log(courses);
}
async function updateAuthor(courseId) { 
  const course = await Course.updateOne({_id:courseId},{
    $set:{
      'author.name':"John"
    }
  });

    // .populate('category','name')
}
// createAuthor('Mosh', 'My bio', 'My Website');
async function addAuthor(courseId,author){
  const course = await Course.findById(courseId)
  course.author.push(author);
  course.save();
}
async function removeAuthor(courseId,authorId){
  const course = await Course.findById(courseId)
  const author = course.author.id(authorId);
  author.remove();
  course.save();
}
// createCourse('Node Course', new Author({name:"Seymur"}))

// listCourses();
// updateAuthor('5e5c0589a0f671151671f8cd');
// addAuthor('5e5c0777d0157d1638c1d2cb',new Author({name:'Seymur'}));
// removeAuthor('5e5c0777d0157d1638c1d2cb','5e5c078efc6db2164fcbf801');