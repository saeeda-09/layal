import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,                
                required: true,
                min: 1,
                default: 1
            },
            price: {
                type: Number,
                min: 0
            },
            image: {
                type: String,
                required: false
            }
        }],

        status: {
            type: String,
            required: true,
            enum: ["active", "ordered", "cancelled", "abandoned"],
            default: "active"
        }
    },
    {
        timestamps: true 
    }
);

export default mongoose.model("Cart", cartSchema);