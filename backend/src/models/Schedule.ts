// backend/src/models/Schedule.ts

import mongoose, { Schema, Document } from 'mongoose'
import TimeSlotSchema, { ITimeSlot } from './TimeSlot'

/**
 * Defines a single course entry in a schedule.
 */
export interface ICourse {
    _id?: mongoose.Types.ObjectId
    code: string
    name: string
    instructor: string
    credits: number
    timeSlots: ITimeSlot[]
    color: string
}

/**
 * Top-level Schedule document interface.
 */
export interface ISchedule extends Document {
    userId: mongoose.Types.ObjectId
    name: string
    semester: 'پاییز' | 'زمستان' | 'بهار' | 'تابستان'
    year: number
    courses: ICourse[]
}

// Subschema for a course, used only within Schedule
const CourseSubSchema = new Schema<ICourse>(
    {
        code: { type: String, required: true },
        name: { type: String, required: true },
        instructor: { type: String, required: true },
        credits: { type: Number, required: true },
        timeSlots: { type: [TimeSlotSchema], default: [] },
        color: { type: String, required: true }
    },
    { _id: true, timestamps: false }
)

const ScheduleSchema = new Schema<ISchedule>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        semester: {
            type: String,
            enum: ['پاییز', 'زمستان', 'بهار', 'تابستان'],
            required: true
        },
        year: { type: Number, required: true },
        // Use the inline CourseSubSchema array
        courses: { type: [CourseSubSchema], default: [] }
    },
    { timestamps: true }
)

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema)
