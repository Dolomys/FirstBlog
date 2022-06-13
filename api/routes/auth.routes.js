import Router from 'express'

import { register, login, changeAccount } from '../controllers/auth.controller.js'
import { alreadyConnected, isAuth } from '../middlewares/isAuth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.put('/updateAcc/:id', changeAccount)
// router.post('/refresh', refrehToken)

export default router