import { List } from '../interfaces/list.interface'
import { type BasicUser } from './../interfaces/user.interface'

import { User } from '../interfaces/user.interface'
import { locateListWithId } from './item'
import UserModel from '../models/user'
import InvitationModel from '../models/invitations'

interface InvitationData {
  data: {
    list: List
    guest: User
  }
  user: User
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

const acceptInvitation = () => {}

export { createDataInvitation, acceptInvitation, processInvitation }
