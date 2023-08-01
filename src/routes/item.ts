import { Router } from 'express'
import {
  deleteItem,
  getItem,
  getItems,
  postItem,
  updateItem
} from '../controllers/item'
import { loggMiddleware } from '../middlewares/log'

const router = Router()

router.get('/', getItems)
router.get('/:id', loggMiddleware, getItem)
router.post('/', postItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

export { router }
