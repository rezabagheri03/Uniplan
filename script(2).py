# Now let's create ALL the backend files
backend_files = {}

# Backend package.json
backend_files["backend/package.json"] = """{
  "name": "university-scheduling-backend",
  "version": "1.0.0",
  "description": "Backend API for University Course Scheduling System",
  "main": "dist/server.js",
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "seed": "ts-node src/scripts/seed.ts",
    "migrate": "ts-node src/scripts/migrate.ts"
  },
  "dependencies": {
    "express": "^4.18.0",
    "typescript": "^5.0.0",
    "@types/express": "^4.17.0",
    "mongoose": "^7.4.0",
    "@types/mongoose": "^5.11.0",
    "bcryptjs": "^2.4.3",
    "@types/bcryptjs": "^2.4.0",
    "jsonwebtoken": "^9.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "express-validator": "^7.0.1",
    "helmet": "^7.0.0",
    "cors": "^2.8.5",
    "@types/cors": "^2.8.0",
    "morgan": "^1.10.0",
    "@types/morgan": "^1.9.0",
    "compression": "^1.7.4",
    "@types/compression": "^1.7.0",
    "dotenv": "^16.3.0",
    "multer": "^1.4.5",
    "@types/multer": "^1.4.0",
    "socket.io": "^4.7.0",
    "nodemailer": "^6.9.0",
    "@types/nodemailer": "^6.4.0",
    "moment-jalaali": "^0.9.6",
    "pdfkit": "^0.13.0",
    "@types/pdfkit": "^0.12.0",
    "exceljs": "^4.3.0",
    "qrcode": "^1.5.3",
    "@types/qrcode": "^1.5.0",
    "express-rate-limit": "^6.8.0",
    "express-mongo-sanitize": "^2.2.0",
    "xss-clean": "^0.1.1",
    "hpp": "^0.2.3",
    "cookie-parser": "^1.4.6",
    "@types/cookie-parser": "^1.4.0",
    "winston": "^3.10.0",
    "joi": "^17.9.0",
    "lodash": "^4.17.21",
    "@types/lodash": "^4.14.0",
    "uuid": "^9.0.0",
    "@types/uuid": "^9.0.0",
    "sharp": "^0.32.0",
    "node-cron": "^3.0.2",
    "@types/node-cron": "^3.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "ts-node": "^10.9.0",
    "@types/node": "^20.4.0",
    "jest": "^29.6.0",
    "@types/jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "supertest": "^6.3.0",
    "@types/supertest": "^2.0.0",
    "eslint": "^8.45.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "prettier": "^3.0.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-prettier": "^5.0.0"
  }
}"""

# Main server file
backend_files["backend/src/server.ts"] = """import app from './app'
import { connectDB } from './config/database'
import { logger } from './utils/logger'

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB()
    
    // Start server
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`)
      logger.info(`📚 University Scheduling API ready`)
      logger.info(`🌐 Environment: ${process.env.NODE_ENV}`)
    })

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully')
      server.close(() => {
        logger.info('Process terminated')
      })
    })

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully')
      server.close(() => {
        logger.info('Process terminated')
      })
    })

  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()"""

# Express app setup
backend_files["backend/src/app.ts"] = """import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import { logger } from './utils/logger'

// Routes
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import scheduleRoutes from './routes/schedules'
import courseRoutes from './routes/courses'
import conflictRoutes from './routes/conflicts'
import exportRoutes from './routes/export'
import reportRoutes from './routes/reports'

const app = express()

// Trust proxy
app.set('trust proxy', 1)

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Data sanitization
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// Compression
app.use(compression())

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.substring(0, message.lastIndexOf('\\n')))
    }
  }))
}

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/conflicts', conflictRoutes)
app.use('/api/export', exportRoutes)
app.use('/api/reports', reportRoutes)

// 404 handler
app.use(notFound)

// Global error handler
app.use(errorHandler)

export default app"""

# Database config
backend_files["backend/src/config/database.ts"] = """import mongoose from 'mongoose'
import { logger } from '../utils/logger'

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/university-scheduling'
    
    const conn = await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`)
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected')
    })

    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      logger.info('MongoDB connection closed through app termination')
      process.exit(0)
    })

  } catch (error) {
    logger.error('Database connection failed:', error)
    process.exit(1)
  }
}"""

# User model
backend_files["backend/src/models/User.ts"] = """import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  avatar?: string
  settings: {
    theme: 'light' | 'dark' | 'system'
    language: 'fa' | 'en'
    timezone: string
    notifications: {
      email: boolean
      push: boolean
      conflicts: boolean
      reminders: boolean
    }
  }
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'نام الزامی است'],
    trim: true,
    maxlength: [50, 'نام نمی‌تواند بیش از ۵۰ کاراکتر باشد']
  },
  email: {
    type: String,
    required: [true, 'ایمیل الزامی است'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/, 'ایمیل معتبر وارد کنید']
  },
  password: {
    type: String,
    required: [true, 'رمز عبور الزامی است'],
    minlength: [6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  avatar: String,
  settings: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    language: {
      type: String,
      enum: ['fa', 'en'],
      default: 'fa'
    },
    timezone: {
      type: String,
      default: 'Asia/Tehran'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      conflicts: { type: Boolean, default: true },
      reminders: { type: Boolean, default: true }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v
      delete ret.password
      return ret
    }
  }
})

// Index for better performance
UserSchema.index({ email: 1 })
UserSchema.index({ createdAt: -1 })

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<IUser>('User', UserSchema)"""

# Schedule model
backend_files["backend/src/models/Schedule.ts"] = """import mongoose, { Document, Schema } from 'mongoose'

export interface ITimeSlot {
  day: 'شنبه' | 'یکشنبه' | 'دوشنبه' | 'سه‌شنبه' | 'چهارشنبه' | 'پنج‌شنبه'
  startTime: string // "08:00"
  endTime: string   // "09:30"
  location?: string
  type: 'نظری' | 'عملی' | 'تمرین'
}

export interface ICourse {
  _id?: string
  code: string
  name: string
  instructor: string
  credits: number
  group?: number
  department?: string
  timeSlots: ITimeSlot[]
  examDate?: Date
  examTime?: string
  examLocation?: string
  color: string
  notes?: string
}

export interface ISchedule extends Document {
  userId: mongoose.Types.ObjectId
  name: string
  description?: string
  semester: 'پاییز' | 'زمستان' | 'بهار' | 'تابستان'
  year: number
  isActive: boolean
  courses: ICourse[]
  totalCredits: number
  settings: {
    showConflicts: boolean
    autoSave: boolean
    gridSize: number
    timeFormat: '12' | '24'
  }
  createdAt: Date
  updatedAt: Date
}

const TimeSlotSchema: Schema = new Schema({
  day: {
    type: String,
    required: true,
    enum: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه']
  },
  startTime: {
    type: String,
    required: [true, 'زمان شروع الزامی است'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'فرمت زمان معتبر نیست']
  },
  endTime: {
    type: String,
    required: [true, 'زمان پایان الزامی است'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'فرمت زمان معتبر نیست']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'نام مکان نمی‌تواند بیش از ۱۰۰ کاراکتر باشد']
  },
  type: {
    type: String,
    enum: ['نظری', 'عملی', 'تمرین'],
    default: 'نظری'
  }
}, { _id: false })

const CourseSchema: Schema = new Schema({
  code: {
    type: String,
    required: [true, 'کد درس الزامی است'],
    trim: true,
    uppercase: true,
    maxlength: [20, 'کد درس نمی‌تواند بیش از ۲۰ کاراکتر باشد']
  },
  name: {
    type: String,
    required: [true, 'نام درس الزامی است'],
    trim: true,
    maxlength: [200, 'نام درس نمی‌تواند بیش از ۲۰۰ کاراکتر باشد']
  },
  instructor: {
    type: String,
    required: [true, 'نام استاد الزامی است'],
    trim: true,
    maxlength: [100, 'نام استاد نمی‌تواند بیش از ۱۰۰ کاراکتر باشد']
  },
  credits: {
    type: Number,
    required: [true, 'تعداد واحد الزامی است'],
    min: [1, 'تعداد واحد باید حداقل ۱ باشد'],
    max: [6, 'تعداد واحد نمی‌تواند بیش از ۶ باشد']
  },
  group: {
    type: Number,
    min: [1, 'شماره گروه باید حداقل ۱ باشد']
  },
  department: {
    type: String,
    trim: true,
    maxlength: [100, 'نام دانشکده نمی‌تواند بیش از ۱۰۰ کاراکتر باشد']
  },
  timeSlots: {
    type: [TimeSlotSchema],
    required: [true, 'حداقل یک زمان برای درس الزامی است'],
    validate: {
      validator: function(slots: ITimeSlot[]) {
        return slots.length > 0
      },
      message: 'درس باید حداقل یک زمان داشته باشد'
    }
  },
  examDate: Date,
  examTime: {
    type: String,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'فرمت زمان امتحان معتبر نیست']
  },
  examLocation: {
    type: String,
    trim: true,
    maxlength: [100, 'مکان امتحان نمی‌تواند بیش از ۱۰۰ کاراکتر باشد']
  },
  color: {
    type: String,
    default: '#3B82F6',
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'رنگ باید در فرمت hex باشد']
  },
  notes: {
    type: String,
    maxlength: [500, 'یادداشت نمی‌تواند بیش از ۵۰۰ کاراکتر باشد']
  }
}, { timestamps: true })

const ScheduleSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'نام برنامه الزامی است'],
    trim: true,
    maxlength: [100, 'نام برنامه نمی‌تواند بیش از ۱۰۰ کاراکتر باشد']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'توضیحات نمی‌تواند بیش از ۵۰۰ کاراکتر باشد']
  },
  semester: {
    type: String,
    required: [true, 'ترم الزامی است'],
    enum: ['پاییز', 'زمستان', 'بهار', 'تابستان']
  },
  year: {
    type: Number,
    required: [true, 'سال الزامی است'],
    min: [1400, 'سال باید از ۱۴۰۰ به بعد باشد'],
    max: [1450, 'سال نمی‌تواند بیش از ۱۴۵۰ باشد']
  },
  isActive: {
    type: Boolean,
    default: false
  },
  courses: {
    type: [CourseSchema],
    default: []
  },
  settings: {
    showConflicts: { type: Boolean, default: true },
    autoSave: { type: Boolean, default: true },
    gridSize: { type: Number, default: 30, min: 15, max: 60 },
    timeFormat: { type: String, enum: ['12', '24'], default: '24' }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for total credits
ScheduleSchema.virtual('totalCredits').get(function() {
  return this.courses.reduce((total: number, course: ICourse) => total + course.credits, 0)
})

// Indexes
ScheduleSchema.index({ userId: 1, createdAt: -1 })
ScheduleSchema.index({ userId: 1, isActive: -1 })
ScheduleSchema.index({ 'courses.code': 1 })
ScheduleSchema.index({ 'courses.instructor': 1 })

// Ensure only one active schedule per user
ScheduleSchema.pre('save', async function(next) {
  if (this.isActive && this.isModified('isActive')) {
    await mongoose.model('Schedule').updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { isActive: false }
    )
  }
  next()
})

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema)"""

# Auth controller
backend_files["backend/src/controllers/authController.ts"] = """import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User, { IUser } from '../models/User'
import { asyncHandler } from '../utils/asyncHandler'
import { AppError } from '../utils/AppError'
import { logger } from '../utils/logger'

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  })
}

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(user._id)
  
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  }

  res.cookie('jwt', token, cookieOptions)
  
  // Update last login
  user.lastLogin = new Date()
  user.save({ validateBeforeSave: false })

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError('اطلاعات وارد شده معتبر نیست', 400, errors.array()))
  }

  const { name, email, password } = req.body

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return next(new AppError('کاربری با این ایمیل قبلاً ثبت‌نام کرده است', 400))
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  logger.info(`New user registered: ${email}`)
  createSendToken(user, 201, res)
})

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError('اطلاعات وارد شده معتبر نیست', 400, errors.array()))
  }

  const { email, password } = req.body

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password')
  
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('ایمیل یا رمز عبور اشتباه است', 401))
  }

  if (!user.isActive) {
    return next(new AppError('حساب کاربری شما غیرفعال است', 401))
  }

  logger.info(`User logged in: ${email}`)
  createSendToken(user, 200, res)
})

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  
  res.status(200).json({
    status: 'success',
    message: 'با موفقیت خارج شدید'
  })
})

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById((req as any).user.id)
  
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

export const updatePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError('اطلاعات وارد شده معتبر نیست', 400, errors.array()))
  }

  const { currentPassword, newPassword } = req.body

  // Get user with password
  const user = await User.findById((req as any).user.id).select('+password')
  
  if (!user) {
    return next(new AppError('کاربر یافت نشد', 404))
  }

  // Check current password
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError('رمز عبور فعلی اشتباه است', 401))
  }

  // Update password
  user.password = newPassword
  await user.save()

  logger.info(`Password updated for user: ${user.email}`)
  createSendToken(user, 200, res)
})

export const refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById((req as any).user.id)
  
  if (!user) {
    return next(new AppError('کاربر یافت نشد', 404))
  }

  createSendToken(user, 200, res)
})"""

# Save backend files
import json
with open('backend_files_complete.json', 'w', encoding='utf-8') as f:
    json.dump(backend_files, f, ensure_ascii=False, indent=2)

print("✅ فایل‌های Backend کامل شد!")
print("=" * 60)
print("📁 Backend Files Created:")
print("   ✓ package.json - وابستگی‌های کامل Node.js")
print("   ✓ server.ts - سرور اصلی")
print("   ✓ app.ts - Express app با middleware")
print("   ✓ database.ts - اتصال MongoDB")
print("   ✓ User.ts - مدل کاربر کامل")
print("   ✓ Schedule.ts - مدل برنامه کامل")
print("   ✓ authController.ts - کنترلر احراز هویت")