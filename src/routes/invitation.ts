import { Router } from 'express'

import { sendCtrl, acceptCtrl } from '../controllers/invitation'
import { checkJwt } from '../middlewares/session'

const router = Router()
// /auth/register [POST]
router.post('/send', checkJwt, sendCtrl)
// /auth/login
router.post('/accept', checkJwt, acceptCtrl)

export { router }
