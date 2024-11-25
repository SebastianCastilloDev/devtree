import mongoose from "mongoose";

export const connectDB = async (): Promise<void>=> {

  const url = process.env.MONGO_URI
  
  try {
    const {connection} = await mongoose.connect(url) 
    const url2 = `${connection.host}:${connection.port}`
    
    console.log(`Mongo db conectado en ${url2}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}