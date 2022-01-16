import { Request, Response, NextFunction } from 'express'
import { errorMessages } from './constants'
import multer from 'multer'
import AppError from './AppError'
import { JsonWebTokenError } from 'jsonwebtoken'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message
    })
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message
    })
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      message: err.message
    })
  }
  return res.status(500).json(errorMessages.ERR_DEFAULT)
}

export { errorHandler }
