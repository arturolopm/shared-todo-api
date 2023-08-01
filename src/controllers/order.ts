import { Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { RequestExtended } from '../interfaces/auth.interface'

const getItems = async (req: RequestExtended, res: Response) => {
  try {
    res.send({
      data: 'Only for active sessions jwt',
      user: req.user
    })
  } catch (e) {
    handleHttp(res, 'error get items')
  }
}

export { getItems }
