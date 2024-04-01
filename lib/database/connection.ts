import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

const dbConnect = async () => {
    try {
        // Connect to the database
        await mongoose.connect(MONGO_URL as string);

        // Log a success message to the console
        console.log("Database connected successfully");
    } catch (error) {
        // Log the error message to the console
        console.error("Error connecting to the database", error);
        // It's a good practice to re-throw the error to handle it in the calling code
        throw error;
    }
};

export default dbConnect;