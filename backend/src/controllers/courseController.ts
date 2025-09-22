// src/controllers/courseController.ts

import { Request, Response } from 'express'
import Schedule from '../models/Schedule'
import { asyncHandler } from '../utils/asyncHandler'

export const addCourse = asyncHandler(async (req: Request, res: Response) => {
    const { scheduleId, code, name, instructor, credits, timeSlots, color } = req.body
    const schedule = await Schedule.findById(scheduleId)
    if (!schedule) {
        return res.status(404).json({ error: 'Schedule not found' })
    }

    schedule.courses.push({ code, name, instructor, credits, timeSlots, color })
    await schedule.save()
    res.status(201).json({ status: 'success', data: { schedule } })
})

export const getCourses = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id
    const schedules = await Schedule.find({ userId })
    // Convert subdocuments to plain objects
    const courses = schedules.flatMap(s =>
        s.courses.map(c => ({
            _id: c._id,
            code: c.code,
            name: c.name,
            instructor: c.instructor,
            credits: c.credits,
            timeSlots: c.timeSlots,
            color: c.color,
            scheduleId: s._id
        }))
    )
    res.json({ status: 'success', data: { courses } })
})

export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.id
    const schedule = await Schedule.findOneAndUpdate(
        { 'courses._id': courseId },
        { $set: { 'courses.$.code': req.body.code, 'courses.$.name': req.body.name, 'courses.$.instructor': req.body.instructor, 'courses.$.credits': req.body.credits, 'courses.$.timeSlots': req.body.timeSlots, 'courses.$.color': req.body.color } },
        { new: true }
    )
    if (!schedule) {
        return res.status(404).json({ error: 'Course not found' })
    }
    res.json({ status: 'success', data: { schedule } })
})

export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.id
    const schedule = await Schedule.findOneAndUpdate(
        { 'courses._id': courseId },
        { $pull: { courses: { _id: courseId } } },
        { new: true }
    )
    if (!schedule) {
        return res.status(404).json({ error: 'Course not found' })
    }
    res.status(204).end()
})
