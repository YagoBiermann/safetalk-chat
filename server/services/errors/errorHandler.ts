import { IErrorMessage } from './interfaces/IErrorMessage'
import { Request, Response, NextFunction } from 'express'
import { ERR_DEFAULT } from './constants'

const isAppError = (object: any): object is IErrorMessage => {
  return object && object.status && object.message && object.code
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isAppError(err) && !(err instanceof Error)) {
    return res.status(err.status).json({
      message: err.message,
      code: err.code
    })
  }
  return res.status(500).json(ERR_DEFAULT)
}

export { errorHandler }
