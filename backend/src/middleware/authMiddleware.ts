// backend/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'  // Updated to match actual filename

interface JwtPayload {
    id: string
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.token) {
        token = req.cookies.token
    }

    if (!token) {
        return res.status(401).json({ status: 'fail', message: 'Not authorized' })
    }

    try {
        const secret = process.env.JWT_SECRET
        if (!secret) throw new Error('JWT_SECRET not defined')

        const decoded = jwt.verify(token, secret) as JwtPayload
        const user = await User.findById(decoded.id).select('-password')
        if (!user) {
            return res.status(401).json({ status: 'fail', message: 'User not found' })
        }

        ;(req as any).user = user
        next()
    } catch {
        return res.status(401).json({ status: 'fail', message: 'Invalid token' })
    }
}
