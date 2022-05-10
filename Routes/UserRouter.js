import express from 'express'
import { registerUser, authUser, updateUser, deleteUser } from '../Controllers/UserController.js'
import { protectUser } from '../Middileware/AuthMiddleware.js'

const router = express.Router()


router.route('/login').post(authUser)
router.route('/:id').put(protectUser, updateUser)
router.route('/:id').delete(protectUser, deleteUser)
router.route('/').post(registerUser)



export default router