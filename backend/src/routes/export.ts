import { Router } from 'express'
import {
    exportPDF, exportExcel,
    exportJSON, exportImage
} from '../controllers/exportController'
import { protect } from '../middleware/auth'

const router = Router()
router.use(protect)
router.get('/pdf/:scheduleId', exportPDF)
router.get('/excel/:scheduleId', exportExcel)
router.get('/json/:scheduleId', exportJSON)
router.get('/image/:scheduleId', exportImage)
export default router
