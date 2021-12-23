import { IErrorMessage } from './interfaces/IErrorMessage'
import { Request, Response, NextFunction } from 'express'
import { ERR_DEFAULT } from './constants'
import multer from 'multer'

const isAppError = (object: any): object is IErrorMessage => {
  return object && object.status && object.message
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isAppError(err) && !(err instanceof Error)) {
    return res.status(err.status).json({
      message: err.message
    })
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message
    })
  }

  return res.status(500).json(ERR_DEFAULT)
}

export { errorHandler }
