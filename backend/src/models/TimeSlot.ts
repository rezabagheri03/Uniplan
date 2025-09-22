// backend/src/models/TimeSlot.ts

import { Document, Schema } from 'mongoose'

export interface ITimeSlot {
    day: string
    startTime: string
    endTime: string
    location?: string
    type: string
}

export interface ITimeSlotDoc extends ITimeSlot, Document {}

const TimeSlotSchema = new Schema<ITimeSlot>(
    {
        day: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        location: { type: String },
        type: { type: String, required: true }
    },
    { _id: false }
)

export default TimeSlotSchema
