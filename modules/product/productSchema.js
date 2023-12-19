const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   Name:String,
   Description:String,
   price:String,
},{strict: false});

module.exports = mongoose.model('products', schema);