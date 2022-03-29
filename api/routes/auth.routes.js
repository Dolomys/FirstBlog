import Router from 'express'

import { register, login, logout } from '../controllers/auth.controller.js'
import { alreadyConnected, isAuth } from '../middlewares/isAuth.js'

const router = Router()

router.post('/register',alreadyConnected, register)
router.post('/login', alreadyConnected, login)
router.post('/logout', isAuth, logout)

export default router