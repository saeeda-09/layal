import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please enter product name"],
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },

        description: {
            type: String
        },

        stock: {
            type: Number
        },

        isAvailable: {
            type: Boolean,
            default: true
        },

        ratings: {
            type: Number
        },

        image: {
            type: String
        },

    },
    {
        timestamps: true
    }
);

export default mongoose.model("Product", ProductSchema);