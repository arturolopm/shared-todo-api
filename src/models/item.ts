import { Schema, Types, model, Model } from 'mongoose'
import { Task } from '../interfaces/task.interface'

const ItemSchema = new Schema<Task>(
  {
    name: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    addedBy: { type: String },
    completedBy: { type: String },
    time: { type: Number }
    // workSpace: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
)

const ItemModel = model('items', ItemSchema)
export default ItemModel
