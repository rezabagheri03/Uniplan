// backend/src/types/express.d.ts

import { IUser } from '../models/User'
import { Request } from 'express'

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: string
            role?: string
        } & Partial<IUser>
    }
}
