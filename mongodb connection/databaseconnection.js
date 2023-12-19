const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/mydatabase';
 
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
});