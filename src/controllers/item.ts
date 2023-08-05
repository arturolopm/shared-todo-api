import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import {
  insertTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  deleteCompletedTasks
} from '../services/item'

const getItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const response = await getTask(id)
    const data = response ? response : 'NOT_FOUND'

    res.send(data)
  } catch (e) {
    handleHttp(res, 'error get item')
  }
}
const getItems = async (req: Request, res: Response) => {
  try {
    const response = await getTasks()
    res.send(response)
  } catch (e) {
    handleHttp(res, 'error get items')
  }
}
const updateItem = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params
    const response = await updateTask(id, body)
    res.send(response)
  } catch (e) {
    handleHttp(res, 'error update item')
  }
}
const postItem = async ({ body }: Request, res: Response) => {
  try {
    const responseItem = await insertTask(body)
    res.send(responseItem)
  } catch (e) {
    handleHttp(res, `error post item ${e}`, e)
  }
}
const deleteItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const response = await deleteTask(id)

    res.send(response)
  } catch (e) {
    handleHttp(res, 'error delete item')
  }
}
const deleteItems = async (req: Request, res: Response) => {
  try {
    const response = await deleteCompletedTasks()

    res.send(response)
  } catch (e) {
    handleHttp(res, 'error delete item')
  }
}

export { getItem, getItems, updateItem, postItem, deleteItem, deleteItems }
