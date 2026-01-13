const                    
   mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
       name: {
        type: String,
        required: true 
    },
    price: {
        type: Number,  
        required: true
    },
    description: { 
        type: String
    },
    category: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ""
    }

    },
    {
        timestamps: true
    }
);


const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
/*import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    price: {
        type: Number,  
        required: true
    },
    description: { 
        type: String
    },
    category: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });
export const Product = mongoose.model('Product', productSchema);
//module.exports = Product;*/
