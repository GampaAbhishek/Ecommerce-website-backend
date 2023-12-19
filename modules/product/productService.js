const products = require('./productSchema')
const mongoose = require('mongoose');

async function createProduct(data) {
    const product = new products(data);
    return await product.save();
}

async function getAllProducts() {
    return await products.find();
}

async function deleteOne(id) {
    return await products.findByIdAndDelete(convertObjectId(id));
}

async function updateData(a,data) {
    console.log(typeof(a));
    return await products.findByIdAndUpdate(convertObjectId(a), data);
}

function convertObjectId(id) {
    return new mongoose.Types.ObjectId(id);
}

module.exports = { createProduct, getAllProducts, deleteOne, updateData };