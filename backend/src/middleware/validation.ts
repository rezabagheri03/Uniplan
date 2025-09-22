
import { body } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const validateRegister = [
    body('name').notEmpty().withMessage('نام الزامی است'),
    body('email').isEmail().withMessage('ایمیل معتبر نیست'),
    body('password').isLength({ min: 6 }).withMessage('رمز عبور حداقل ۶ کاراکتر'),
    (req: Request, _res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next({ status: 400, message: errors.array().map(e => e.msg).join(', ') })
        }
        next()
    }
]

export const validateLogin = [
    body('email').isEmail().withMessage('ایمیل معتبر نیست'),
    body('password').notEmpty().withMessage('رمز عبور الزامی است'),
    (req: Request, _res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next({ status: 400, message: errors.array().map(e => e.msg).join(', ') })
        }
        next()
    }
]
