/**
 * @openapi
 * tags:
 *   - name: Courses
 *     description: Course management
 */

/**
 * @openapi
 * /api/courses:
 *   get:
 *     tags: [Courses]
 *     summary: List all courses for user schedules
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of courses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoursesResponse'
 *
 *   post:
 *     tags: [Courses]
 *     summary: Add a course to a schedule
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCourseRequest'
 *     responses:
 *       201:
 *         description: Schedule with new course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
 */

/**
 * @openapi
 * /api/courses/{id}:
 *   patch:
 *     tags: [Courses]
 *     summary: Update a course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCourseRequest'
 *     responses:
 *       200:
 *         description: Updated schedule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
 *
 *   delete:
 *     tags: [Courses]
 *     summary: Delete a course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     responses:
 *       204:
 *         description: No content
 */
import { Router } from 'express'
import { protect } from '../middleware/auth'
import { addCourse, getCourses, updateCourse, deleteCourse } from '../controllers/courseController'
const router = Router()
router.use(protect)
router.get('/', getCourses)
router.post('/', addCourse)
router.patch('/:id', updateCourse)
router.delete('/:id', deleteCourse)
export default router
