import { List } from '../interfaces/list.interface'
import { type BasicUser } from './../interfaces/user.interface'

import { User } from '../interfaces/user.interface'
import { locateListWithId } from './item'
import UserModel from '../models/user'
import InvitationModel from '../models/invitations'
import { Types } from 'mongoose'

interface InvitationData {
  data: {
    list: List
    guest: User
  }
  user: User
}
interface AcceptInvitationData {
  _id: Types.ObjectId
  user: string
}

const createDataInvitation = async ({ email, _id }: BasicUser) => {
  const list: List = (await locateListWithId(_id))[0] as unknown as List
  const guest: User = (await UserModel.findOne({ email })) as User

  if (!list || !guest) {
    return 'NOT_FOUND'
  } else {
    return { list, guest }
  }
}
const processInvitation = async ({ data, user }: InvitationData) => {
  const responseItem = await InvitationModel.create({
    sender: user,
    senderId: data.list.owners[0]._id,
    receiver: data.guest.email
  })
  return { responseItem }
}

const acceptInvitation = async ({ _id, user }: AcceptInvitationData) => {
  console.log('Reached')

  const invitation = await InvitationModel.findById(_id)
  if (!invitation) return 'INVITATION_NOT_FOUND'
  const senderId = invitation ? invitation.senderId : null
  if (!senderId) {
    return 'ERROR_NOT_SENDER'
  }
  const lists = await locateListWithId(senderId)
  if (lists.length > 0) {
    const list = lists[lists.length - 1]
    const newUser = await UserModel.findOne({ email: user })
    if (!newUser) return 'ERROR_NOT_USER'
    const dropList = await locateListWithId(newUser._id)

    if (dropList.length > 0 && newUser) {
      await Promise.all(
        dropList.map(async (userList) => {
          if (userList.owners.length > 0) {
            userList.owners = userList.owners.filter(
              (owner) => owner._id.toString() !== newUser._id.toString()
            )
          }

          await userList.save() // Save changes
        })
      )
    }
    list.owners.push(newUser._id)

    await list.save()
    await invitation.deleteOne()

    return list
  }
  return 'ERROR_NOT_LIST'
}

const getAllInvitations = async (user: string) => {
  const responseItem = await InvitationModel.find({ receiver: user })
  return responseItem
}

export {
  createDataInvitation,
  acceptInvitation,
  processInvitation,
  getAllInvitations
}
