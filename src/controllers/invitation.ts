import { Request, Response } from 'express'
import {
  createDataInvitation,
  acceptInvitation,
  processInvitation
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
    const responseItem = await processInvitation({ data, user })
    res.send(responseItem)
  }
}
const acceptCtrl = async ({ body }: Request, res: Response) => {
  const {} = body
  const responseItem = await acceptInvitation()
}

export { sendCtrl, acceptCtrl }
