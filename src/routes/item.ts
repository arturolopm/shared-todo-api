import { Router } from 'express'
import {
  deleteItem,
  getItem,
  getItems,
  postItem,
  updateItem,
  deleteItems
} from '../controllers/item'
import { checkJwt } from '../middlewares/session'

const router = Router()

router.get('/', checkJwt, getItems)
router.get('/:id', checkJwt, getItem)
router.post('/', checkJwt, postItem)
router.put('/:id', checkJwt, updateItem)
router.delete('/:id', checkJwt, deleteItem)
router.delete('/', checkJwt, deleteItems)

export { router }
