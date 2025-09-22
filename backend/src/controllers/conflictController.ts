import { Request, Response } from 'express'
import conflictService from '../services/conflictDetectionService'
import { asyncHandler } from '../utils/asyncHandler'

export const detectConflicts = asyncHandler(
    async (req: Request, res: Response) => {
        const conflicts = await conflictService.detect(req.params.scheduleId)
        res.json({ status: 'success', results: conflicts.length, data: { conflicts } })
    }
)

export const resolveConflict = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await conflictService.resolve(req.params.scheduleId, req.body)
        res.json({ status: 'success', data: { result } })
    }
)
