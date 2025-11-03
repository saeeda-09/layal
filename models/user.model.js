import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"],
            unique: true // Ensure usernames are unique
        },

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: [true, "Please enter an email"],
            unique: true
        },

        age: {
            type: Number,
            required: true
        },

        password: {
            type: String,
            required: [true, "Please enter a password"]
        },

        address: {
            street: String,
            city: String, 
            country: String
        },

        role: {
            type: String, 
            enum: ["user", "admin"],
            default: "user"
        },

        isActive: {
            type: Boolean, 
            default: true
        },

        hobbies: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Post"
        }]

    },
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);

export default mongoose.model("User", UserSchema);