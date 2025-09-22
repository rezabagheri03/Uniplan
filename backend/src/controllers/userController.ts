import { Request, Response } from 'express'
import User from '../models/User'
import { asyncHandler } from '../utils/asyncHandler'
export const getAllUsers = asyncHandler(async (_req,res) => {
    const users = await User.find()
    res.json({ status:'success', results: users.length, data:{ users }})
})
export const getUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id)
    res.json({ status:'success', data:{ user }})
})
export const updateUser = asyncHandler(async (req,res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{ new:true, runValidators:true })
    res.json({ status:'success', data:{ user }})
})
export const deleteUser = asyncHandler(async (req,res) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).json({ status:'success', data:null })
})
