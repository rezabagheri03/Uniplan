// backend/src/models/Course.ts

import mongoose, { Schema, Document } from 'mongoose'
import TimeSlotSchema, { ITimeSlot } from './TimeSlot'

export interface ICourse extends Document {
    code: string
    name: string
    instructor: string
    credits: number
    timeSlots: ITimeSlot[]
    color: string
}

const CourseSchema = new Schema<ICourse>(
    {
        code: { type: String, required: true },
        name: { type: String, required: true },
        instructor: { type: String, required: true },
        credits: { type: Number, required: true },
        timeSlots: { type: [TimeSlotSchema], default: [] },
        color: { type: String, required: true }
    },
    { timestamps: true }
)

export default mongoose.model<ICourse>('Course', CourseSchema)
