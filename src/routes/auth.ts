import { Router } from 'express'

import { registerCtrl, loginCtrl } from '../controllers/auth'

const router = Router()
// /auth/register [POST]
router.post('/register', registerCtrl)
// /auth/login
router.post('/login', loginCtrl)

export { router }
