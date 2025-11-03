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
                required: true,
                min: 0
            },
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: false
            }
        }],

        totalPrice: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

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

// Pre-save middleware to calculate totalPrice before saving
cartSchema.pre("save", function (next) {
    if (this.items && this.items.length > 0) {
        this.totalPrice = this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    } else {
        this.totalPrice = 0;
    }
    next();
});

export default mongoose.model("Cart", cartSchema);