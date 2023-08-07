import { Types, Schema, model } from 'mongoose'
import UserModel from './user'
import { List } from '../interfaces/list.interface'
import ItemModel from './item'

const ListSchema = new Schema<List>(
  {
    name: { type: String, default: 'Todo' },
    owners: [
      {
        type: Types.ObjectId,
        ref: 'users'
      }
    ],
    items: [
      {
        _id: { type: Types.ObjectId, ref: 'items' }
      }
    ]
  },
  {
    timestamps: true
  }
)

const ListModel = model('lists', ListSchema)

export default ListModel
