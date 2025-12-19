import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ME)
        console.log("Database connected successfully!")   
    } catch (error) {
        console.log("Database is not connected. Something went wrong!")
    }
};