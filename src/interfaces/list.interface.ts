import { Types } from 'mongoose'
import { Task } from './task.interface'

export interface List {
  name: string
  owners: [_id: Types.ObjectId]
  items: Task[]
}
