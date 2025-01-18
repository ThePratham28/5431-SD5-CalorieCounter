import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);

    }catch (error) {
        console.error(`Mongodb Connection Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;