import { Auth } from './auth.interface'

export interface User extends Auth {
  _id: string
  name: string
  description: string
}
