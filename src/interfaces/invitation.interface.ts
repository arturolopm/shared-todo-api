import { Types } from 'mongoose'

export interface Invitation {
  sender: string
  senderId: string
  receiver: string
}
