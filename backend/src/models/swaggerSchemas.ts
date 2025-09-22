// src/models/swaggerSchemas.ts

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     TimeSlot:
 *       type: object
 *       properties:
 *         day:
 *           type: string
 *         startTime:
 *           type: string
 *         endTime:
 *           type: string
 *         type:
 *           type: string
 *
 *     Course:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         instructor:
 *           type: string
 *         credits:
 *           type: integer
 *         timeSlots:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimeSlot'
 *         color:
 *           type: string
 *
 *     Schedule:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         name:
 *           type: string
 *         semester:
 *           type: string
 *         year:
 *           type: integer
 *         courses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Course'
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         token:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *
 *     ScheduleResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             schedule:
 *               $ref: '#/components/schemas/Schedule'
 *
 *     CoursesResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             courses:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *
 *     AddCourseRequest:
 *       type: object
 *       required: [scheduleId, code, name, instructor, credits, timeSlots, color]
 *       properties:
 *         scheduleId:
 *           type: string
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         instructor:
 *           type: string
 *         credits:
 *           type: integer
 *         timeSlots:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimeSlot'
 *         color:
 *           type: string
 *
 *     UpdateCourseRequest:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         instructor:
 *           type: string
 *         credits:
 *           type: integer
 *         timeSlots:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimeSlot'
 *         color:
 *           type: string
 */
