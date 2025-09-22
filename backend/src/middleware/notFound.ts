import { Request, Response, NextFunction } from 'express'

export const notFound = (_req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: 'Not Found' })
    next()
}
