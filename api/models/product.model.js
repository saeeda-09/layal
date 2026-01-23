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
    status: {
        type: String,
        enum: ['available', 'out_of_stock', 'discontinued'],
        default: 'available'
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
