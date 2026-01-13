const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        type: {
            type: String,
            enum: ['standard', 'premium'],
            default: 'standard'
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }
        
    },
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;