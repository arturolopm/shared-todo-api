import { Types } from 'mongoose'
import { Auth } from './auth.interface'

export interface User extends Auth {
  _id: Types.ObjectId
  name: string
  description: string
}

export type BasicUser = Pick<User, '_id' | 'email'>
