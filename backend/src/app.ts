// src/app.ts

import 'dotenv/config'
import express, { RequestHandler } from 'express'
import healthRoutes from './routes/health'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger'

import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import scheduleRoutes from './routes/schedules'
import courseRoutes from './routes/courses'
import conflictRoutes from './routes/conflicts'
import exportRoutes from './routes/export'
import reportRoutes from './routes/reports'
import { notFound } from './middleware/notFound'
import { errorHandler } from './middleware/errorHandler'

// Import xss-clean using require
const xss: () => RequestHandler = require('xss-clean')

const app = express()

app.use(helmet())
app.use('/health', healthRoutes)
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(mongoSanitize())
// Now xss() is correctly typed as RequestHandler
app.use(xss())
app.use(hpp())
app.use(compression())
app.use(morgan('dev'))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/conflicts', conflictRoutes)
app.use('/api/export', exportRoutes)
app.use('/api/reports', reportRoutes)

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(notFound)
app.use(errorHandler)

export default app
