import { Router } from 'express'
import { detectConflicts, resolveConflict } from '../controllers/conflictController'
import { protect } from '../middleware/auth'

const router = Router()

router.use(protect)
router.get('/:scheduleId', detectConflicts)
router.post('/:scheduleId/resolve', resolveConflict)

export default router
