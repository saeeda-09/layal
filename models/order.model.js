import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Add to your cart"]
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

        address: {
            type: String,
            required: [true, "Add your address"]
        },

        image: {
            type: String,
            required: false
        }
    },

    {
        timestamps: true
    }
);

export default mongoose.model("Order", orderSchema)