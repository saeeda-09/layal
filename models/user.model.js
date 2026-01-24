import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"],
            unique: true, // Ensure usernames are unique
            minLength: 3,
            trim: true
        },

        name: {
            type: String,
        },

        email: {
            type: String,
            required: [true, "Please enter an email"],
            unique: true,
            lowercase: true,
            trim: true
        },

        age: {
            type: Number
        },

        password: {
            type: String,
            required: [true, "Please enter a password"],
            minLength: 4
        },

        address: {
            street: String,
            city: String, 
            country: String
        },

        role: {
            type: String, 
            enum: ["user", "admin", "seller"],
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

UserSchema.pre('save', async function() {
    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password)
}

export default mongoose.model("User", UserSchema);