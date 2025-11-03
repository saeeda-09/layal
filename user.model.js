const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"], 
        unique: true
    },
    age: {
        type: Number,
        min: [0, "Age must be a non-negative number"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
    },
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
/*import mongoose from "mongoose";   
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"], 
        unique: true
    },
    age: {
        type: Number,
        min: [0, "Age must be a non-negative number"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, 
{ timestamps: true });
export const User = mongoose.model('User', userSchema);
//module.exports = User;*/