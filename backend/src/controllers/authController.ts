// src/controllers/authController.ts
import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt, { SignOptions } from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler'

const signToken = (id: string): string => {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET is not defined')

    // Build options and cast to SignOptions
    const options = {
        expiresIn: process.env.JWT_EXPIRE ?? '7d'
    } as SignOptions

    return jwt.sign({ id }, secret, options)
}

const createSendToken = (user: any, statusCode: number, res: Response) => {
    const token = signToken(user._id.toString())
    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    })
}

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({ error: 'User already exists' })
    }
    const user = await User.create({ name, email, password })
    createSendToken(user, 201, res)
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await bcrypt.compare(password, user.password!))) {
        return res.status(401).json({ error: 'Invalid credentials' })
    }
    createSendToken(user, 200, res)
})

export const logout = asyncHandler(async (_req: Request, res: Response) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({ status: 'success', message: 'Logged out successfully' })
})

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ status: 'success', data: { user: req.user } })
})
