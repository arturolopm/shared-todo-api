import { Types, Schema, model } from 'mongoose'
import UserModel from './user'
import { List } from '../interfaces/list.interface'
import ItemModel from './item'

const ListSchema = new Schema<List>(
  {
    name: { type: String, default: 'Todo' },
    owners: [
      {
        _id: { type: String, ref: UserModel }
      }
    ],
    items: [
      {
        _id: { type: String, ref: ItemModel }
      }
    ]
  },
  {
    timestamps: true
  }
)

const ListModel = model('lists', ListSchema)

export default ListModel
