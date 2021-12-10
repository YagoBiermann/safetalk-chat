import { Request, Response, NextFunction } from 'express'

const validateBeforeGetRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGetRooms }
