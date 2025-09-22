import mongoose from 'mongoose'
import { logger } from '../utils/logger'

export const connectDB = async (): Promise<void> => {
    // Read MONGO_URI (falls back to Docker service name)
    const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/university'
    try {
        await mongoose.connect(mongoUri)
        logger.info(`MongoDB connection established to ${mongoUri}`)
    } catch (error) {
        logger.error(`MongoDB connection error: ${error}`)
        throw error
    }
}
