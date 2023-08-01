import { NextFunction, Request, Response } from 'express'

const loggMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers
  const userAgent = header['user-agent']
  console.log(console.log('User-agent', userAgent))

  res.send('FROM_MIDDLEWARE')
}

export { loggMiddleware }
