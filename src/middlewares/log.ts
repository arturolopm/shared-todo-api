import { NextFunction, Request, Response } from 'express'

const loggMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers
  const userAgent = header['user-agent']

  res.send('FROM_MIDDLEWARE')
}

export { loggMiddleware }
