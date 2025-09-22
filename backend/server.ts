import 'dotenv/config'
import app from './src/app'
import { connectDB } from './src/config/database'
import { logger } from './src/utils/logger'

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB()
        logger.info('✅ MongoDB Connected')

        const server = app.listen(PORT, () => {
            logger.info(`🚀 Server running on port ${PORT}`)
            logger.info('📚 University Scheduling API ready')
        })

        process.on('SIGTERM', () => server.close())
        process.on('SIGINT', () => server.close())
    } catch (error) {
        logger.error(`Failed to start server: ${error}`)
        process.exit(1)
    }
}

startServer()
