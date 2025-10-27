import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
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

        image: {
            type: String,
            required: false
        }
    },

    {
        timestamps: true
    }
);

export default mongoose.model("Cart", cartSchema)