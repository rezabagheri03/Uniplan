import { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import conflictDetectionService from '../services/conflictDetectionService'
import Schedule from '../models/Schedule'

export const dashboardStats = asyncHandler(async (_req,res) => {
    const schedules = await Schedule.find()
    res.json({ status:'success', data:{
            totalSchedules: schedules.length,
            totalCourses: schedules.reduce((sum, s) => sum+s.courses.length,0)
        }})
})

export const conflictReport = asyncHandler(async (req,res) => {
    const conflicts = await conflictDetectionService.detect(req.params.scheduleId)
    res.json({ status:'success', results:conflicts.length, data:{ conflicts }})
})
