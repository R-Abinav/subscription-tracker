import mongoose from "mongoose";
import ENV from "../config/env.js";

if(!ENV.MONGO_URI){
    throw new Error('Please define the MONGO_URI environment variable inside .env.<development/production>.local');
}

const connectToDB = async () => {
    try{
        await mongoose.connect(ENV.MONGO_URI);
        console.log(`MongoDB connected and running on ${ENV.NODE_ENV} mode`);
    }catch(err){
        console.error("Error while connecting to DB: ", err);
        process.exit(1);
    }
}

export default connectToDB;
