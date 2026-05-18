import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "MERNAuthentication",
        });

        console.log("MongoDb connected Suceesfully");

    } catch (error) {
        console.error("Failed to Connect");
        process.exit(1);
    }
}

export default connectDB;