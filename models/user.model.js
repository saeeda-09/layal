const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"],
            unique: true // Ensure usernames are unique
        },
        email: {
            type: String,
            required: [true, "Please enter an email"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please enter a password"]
        },
        // You can add more fields like isAdmin, profilePicture, etc.
    },
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;