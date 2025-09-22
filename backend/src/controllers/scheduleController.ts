// src/controllers/scheduleController.ts

import { Request, Response } from 'express'
import Schedule from '../models/Schedule'
import { asyncHandler } from '../utils/asyncHandler'

export const getSchedules = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id
    const schedules = await Schedule.find({ userId })
    res.json({ status: 'success', data: { schedules } })
})

export const createSchedule = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id
    const schedule = await Schedule.create({
        userId,
        name: req.body.name,
        semester: req.body.semester,
        year: req.body.year
    })
    res.status(201).json({ status: 'success', data: { schedule } })
})
