import { Router } from 'express'
import {
  deleteItem,
  getItemsInUserList,
  getItems,
  postItem,
  updateItem,
  deleteItems
} from '../controllers/item'
import { checkJwt } from '../middlewares/session'

const router = Router()

router.get('/:id', checkJwt, getItemsInUserList)
router.get('/', checkJwt, getItems)
router.post('/:id', checkJwt, postItem)
router.put('/:id', checkJwt, updateItem)
router.delete('/:id', checkJwt, deleteItem)
router.delete('/allCompleted/:id', checkJwt, deleteItems)

export { router }
