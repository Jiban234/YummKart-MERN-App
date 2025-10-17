import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connecected successfully");
    } catch (error) {
        console.log("Database Connection error");
    }
}

export default connectDb;