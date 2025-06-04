import mongoose from "mongoose";
import {MONGO_URI, NODE_ENV} from '../config/env.js'

if (!MONGO_URI){
    throw new Error('Please define the mongodb_uri environment variable inside .env.<development/development>.local')
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`Connected to database in ${NODE_ENV}`)
    }catch (error){
        console.error('Error connecting to database: ', error)
        // eslint-disable-next-line no-undef
        process.exit(1)
    }
}
export default connectToDatabase