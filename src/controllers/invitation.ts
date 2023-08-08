import { Response } from 'express'
import {
  createDataInvitation,
  acceptInvitation,
  processInvitation,
  getAllInvitations
} from '../services/invitation'
import { RequestExtended } from '../interfaces/auth.interface'

const sendCtrl = async (req: RequestExtended, res: Response) => {
  const { email, _id } = req.body

  const data = await createDataInvitation({ email, _id })
  if (data === 'NOT_FOUND') {
    res.status(404)
    res.send(data)
  } else {
    const user = typeof req.user === 'string' ? req.user : req.user?.id
    if (user === email) {
      res.status(406)
      res.send('ERROR_SAME_SENDER_AND_RECEIVER')
    } else {
      const responseItem = await processInvitation({ data, user })
      res.send(responseItem)
    }
  }
}
const acceptCtrl = async (req: RequestExtended, res: Response) => {
  const { _id } = req.body

  const user = typeof req.user === 'string' ? req.user : req.user?.id
  const responseItem = await acceptInvitation({ _id, user })
  res.send(responseItem)
}

const getCtrl = async (req: RequestExtended, res: Response) => {
  const user = typeof req.user === 'string' ? req.user : req.user?.id
  const responseItem = await getAllInvitations(user)
  res.send(responseItem)
}

export { sendCtrl, acceptCtrl, getCtrl }
