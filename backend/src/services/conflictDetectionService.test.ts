// src/services/conflictDetectionService.test.ts
import mongoose from 'mongoose'
import Schedule from '../models/Schedule'
import conflictService from './conflictDetectionService'

describe('Conflict Detection Service', () => {
    let scheduleId: mongoose.Types.ObjectId

    beforeEach(async () => {
        const sched = await Schedule.create({
            userId: new mongoose.Types.ObjectId(),
            name: 'ConfTest',
            semester: 'پاییز',
            year: 1404,
            courses: [
                {
                    code: 'A',
                    name: 'A',
                    instructor: 'X',
                    credits: 1,
                    timeSlots: [{ day: 'شنبه', startTime: '08:00', endTime: '10:00', type: 'Lecture' }],
                    color: '#fff'
                },
                {
                    code: 'B',
                    name: 'B',
                    instructor: 'Y',
                    credits: 1,
                    timeSlots: [{ day: 'شنبه', startTime: '09:00', endTime: '11:00', type: 'Lecture' }],
                    color: '#000'
                }
            ]
        })
        scheduleId = sched._id
    })

    it('detects an overlapping time slot conflict', async () => {
        const conflicts = await conflictService.detect(scheduleId.toString())
        expect(conflicts).toHaveLength(1)
        expect(conflicts[0].reason).toBe('Time overlap')
    })

    it('returns no conflicts when slots do not overlap', async () => {
        // update second course to non-overlapping
        await Schedule.findByIdAndUpdate(scheduleId, {
            'courses.1.timeSlots': [{ day: 'یکشنبه', startTime: '08:00', endTime: '10:00', type: 'Lecture' }]
        })
        const conflicts = await conflictService.detect(scheduleId.toString())
        expect(conflicts).toHaveLength(0)
    })
})
