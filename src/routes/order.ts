import { Router } from 'express'
import { getItems } from '../controllers/order'
import { checkJwt } from '../middlewares/session'
/**
 Only for active sessions 
 */
const router = Router()

router.get('/', checkJwt, getItems)

export { router }
