import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://admin:admin123@freshplus.0uyqvxn.mongodb.net/fresh-plus').then(() =>
    console.log("DB Connected!"))
}