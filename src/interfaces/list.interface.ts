import { Types } from 'mongoose'

export interface List {
  name: string
  owners: string[]
  items: string
}
