import mongoose from "mongoose"

 const  connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
         console.log("mongo db is connected")
    } catch (error) {
         console.log("mongo db is connected" ,error.message)
         
    }
 }

 export default connectDB