const mongoose = require('mongoose');
const ratingSchema = require('./rating');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
        type: String, required: true, trim: true
    },
    description: {
        type: String, required: true, trim: true
    },
    images: [{
        type: String, required: true
    }],
    quantity: {
        type: Number, required: true, trim: true
    },
    price: {
        type: Number, required: true, trim: true
    },
    category: {
        type: String, required: true, trim: true
    },
    ratings :[ratingSchema]
  

});


const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product, ProductSchema };