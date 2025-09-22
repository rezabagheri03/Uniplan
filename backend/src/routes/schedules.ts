/**
 * @openapi
 * tags:
 *   - name: Schedules
 *     description: Schedule management
 */

/**
 * @openapi
 * /api/schedules:
 *   get:
 *     tags: [Schedules]
 *     summary: List user schedules
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     schedules:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Schedule'
 *
 *   post:
 *     tags: [Schedules]
 *     summary: Create a new schedule
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, semester, year]
 *             properties:
 *               name:
 *                 type: string
 *               semester:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created schedule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
 */
import { Router } from 'express'
import { protect } from '../middleware/auth'
import { createSchedule, getSchedules } from '../controllers/scheduleController'
const router = Router()
router.use(protect)
router.get('/', getSchedules)
router.post('/', createSchedule)
export default router
