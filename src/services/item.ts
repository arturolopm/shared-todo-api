import { Task } from '../interfaces/task.interface'
import ItemModel from '../models/item'
const insertTask = async (item: Task) => {
  const responseInsert = await ItemModel.create(item)
  return responseInsert
}

const getTasks = async () => {
  const responseItem = await ItemModel.find({})
  return responseItem
}
const getTask = async (id: string) => {
  const responseItem = await ItemModel.findOne({ _id: id })
  return responseItem
}

const updateTask = async (id: string, data: Task) => {
  // Do this bc on front data will arrive with the opposite real value for react setstate asyncronous behavior
  data.completed = !data.completed
  const responseItem = await ItemModel.findOneAndUpdate({ _id: id }, data, {
    new: true
  })

  return responseItem
}
const deleteTask = async (id: string) => {
  const responseItem = await ItemModel.findOneAndRemove({ _id: id })
  return responseItem
}
const deleteCompletedTasks = async () => {
  const responseItem = await ItemModel.deleteMany({ completed: true })
  return responseItem
}

export {
  insertTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  deleteCompletedTasks
}
