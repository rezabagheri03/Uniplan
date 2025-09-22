import { Router } from 'express'
import { dashboardStats, conflictReport } from '../controllers/reportController'
import { protect } from '../middleware/auth'

const router = Router()
router.use(protect)
router.get('/dashboard', dashboardStats)
router.get('/conflicts/:scheduleId', conflictReport)
export default router
