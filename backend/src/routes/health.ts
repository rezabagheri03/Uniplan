import { Router, Request, Response } from 'express'
const router = Router()

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
router.get('/', (_req: Request, res: Response) => {
    res.status(200).send('OK')
})

export default router
