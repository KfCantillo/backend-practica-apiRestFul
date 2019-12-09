const mongoose = require('mongoose');
//const URI = 'mongodb://localhost/practica-full-stack';
const URI = 'mongodb+srv://practica:Practica123@practica-ha6uu.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(URI, { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
  })
  .then(db => console.log('MongoDB is connected!'))
  .catch(error => console.error(error));

module.exports = mongoose;
