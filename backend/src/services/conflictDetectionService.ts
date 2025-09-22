// backend/src/services/conflictDetectionService.ts

import Schedule, { ISchedule } from '../models/Schedule'
import { ITimeSlot } from '../models/TimeSlot'

interface Conflict {
    courseAId: string
    courseBId: string
    reason: string
    slotA: ITimeSlot
    slotB: ITimeSlot
}

async function detect(scheduleId: string): Promise<Conflict[]> {
    const sched = await Schedule.findById(scheduleId).lean<{ courses: ISchedule['courses'] }>()
    if (!sched) throw new Error('Schedule not found')
    const conflicts: Conflict[] = []
    const courses = sched.courses

    for (let i = 0; i < courses.length; i++) {
        for (let j = i + 1; j < courses.length; j++) {
            courses[i].timeSlots.forEach(slotA => {
                courses[j].timeSlots.forEach(slotB => {
                    if (
                        slotA.day === slotB.day &&
                        slotA.startTime < slotB.endTime &&
                        slotB.startTime < slotA.endTime
                    ) {
                        conflicts.push({
                            courseAId: courses[i]?._id?.toString() || '',
                            courseBId: courses[j]?._id?.toString() || '',
                            reason: 'Time overlap',
                            slotA,
                            slotB
                        })
                    }
                })
            })
        }
    }

    return conflicts
}

async function resolve(
    scheduleId: string,
    data: { courseAId: string; courseBId: string }
): Promise<{ success: boolean }> {
    // implement resolution logic
    return { success: true }
}

export default { detect, resolve }
