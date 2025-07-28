import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export default async function ConnectDB(){
    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URI)
        } catch (error) {
        console.log("Error : "+error);
    }
}