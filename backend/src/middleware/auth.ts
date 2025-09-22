// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { asyncHandler } from '../utils/asyncHandler'

interface JwtPayload {
    id: string
    iat: number
    exp: number
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, token missing' })
    }

    let decoded: JwtPayload
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    } catch {
        return res.status(401).json({ error: 'Not authorized, invalid token' })
    }

    const user = await User.findById(decoded.id)
    if (!user) {
        return res.status(401).json({ error: 'Not authorized, user not found' })
    }

    ;(req as any).user = user
    next()
})

// restrictTo middleware for role-based access
export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ error: 'Forbidden' })
        }
        next()
    }
}
