import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
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
            }
        }],

        shippingAddress: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zipCode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true,
                default: "Bangladesh"
            }
        },

        paymentMethod: {
            type: String,
            required: true,
            enum: ["card", "cash on delivery", "mobile banking"],
            default: "cash on delivery"
        },

        paymentStatus: {
            type: String,
            required: true,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending"
        },

        orderStatus: {
            type: String,
            required: true,
            enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
            default: "pending"
        },

        orderDate: {
            type: Date,
            default: Date.now
        },

        deliveryDate: {
            type: Date,
            required: false
        },
        
        trackingNumber: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true 
    }
);

export default mongoose.model("Order", orderSchema);