import { Router } from 'express'

import { sendCtrl, acceptCtrl, getCtrl } from '../controllers/invitation'
import { checkJwt } from '../middlewares/session'

const router = Router()
// /auth/register [POST]
router.post('/send', checkJwt, sendCtrl)
// /auth/login
router.post('/accept', checkJwt, acceptCtrl)
router.get('/', checkJwt, getCtrl)

export { router }
