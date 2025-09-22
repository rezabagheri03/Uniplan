// src/routes/users.ts

import { Router } from 'express'
import {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/userController'
import { protect, restrictTo } from '../middleware/auth'

const router = Router()

// All routes below are protected and restricted to 'admin' role
router.use(protect, restrictTo('admin'))

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
