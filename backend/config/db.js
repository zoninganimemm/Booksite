import mongoose from "mongoose";

const connectDB =async() =>{
    try{

        await mongoose.connect(process.env.DBURL)
        console.log("connect DB")

    }catch(error){
        console.error(error)
        process.emit(1)
    }
}
export default connectDB;