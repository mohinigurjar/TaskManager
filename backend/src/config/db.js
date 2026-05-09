const mongoose = require("mongoose");

exports.connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.error("MONGO_URI is not set");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection failed:", error);
        process.exit(1);
    }
};