import { Schema, Types, model, Model } from 'mongoose'
import { Task } from '../interfaces/task.interface'

const ItemSchema = new Schema<Task>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    addedBy: { type: String, required: true },
    completedBy: { type: String, required: true },
    workSpace: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
)

const ItemModel = model('items', ItemSchema)
export default ItemModel
