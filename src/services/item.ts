import { Types, isValidObjectId } from 'mongoose'
import { Task } from '../interfaces/task.interface'
import ItemModel from '../models/item'
import ListModel from '../models/list'
import UserModel from '../models/user'
import { List } from '../interfaces/list.interface'
const insertTask = async (item: Task, id: string) => {
  const responseInsert = await ItemModel.create(item)
  let list = await locateListWithId(id)

  if (list.length === 0) {
    const newList = await createList(id)
    list = [newList]
  }

  const listToModify = list[0]
  if (listToModify) {
    listToModify.items.push(responseInsert)
    await listToModify.save()
  }

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
const deleteCompletedTasks = async (id: string) => {
  const list = await locateListWithId(id)
  const listToModify = list[0]
  listToModify.items = listToModify.items.filter(
    (item) => item.completed === false
  )
  await listToModify.save()

  return list
}

const createList = async (id: Types.ObjectId | string) => {
  const responseItem = await ListModel.create({
    owners: [id],
    items: []
  })
  return responseItem
}
const locateListWithId = async (id: Types.ObjectId | string) => {
  if (!isValidObjectId(id)) {
    throw new Error('Invalid ObjectId 1')
  }

  const responseItem = await ListModel.find({
    owners: {
      $in: [new Types.ObjectId(id)]
    }
  })
    .populate({
      path: 'owners',
      select: 'name email'
    })
    .populate({ path: 'items' })

  return responseItem
}
const locateItemsWithUserId = async (id: Types.ObjectId | string) => {
  if (!isValidObjectId(id)) {
    throw new Error('Invalid ObjectId user 2')
  }

  const list = (await ListModel.find({
    owners: {
      $in: [new Types.ObjectId(id)]
    }
  })
    .populate({
      path: 'owners',
      select: 'name email'
    })
    .populate({
      path: 'items',
      select: ' name completed completedBy',
      options: { sort: { completed: 1 } }
    })) as unknown as List[]

  const responseItem = list[list.length - 1]

  return responseItem
}

export {
  insertTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
  createList,
  locateListWithId,
  locateItemsWithUserId
}
