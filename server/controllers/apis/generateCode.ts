import { Request, Response, NextFunction } from 'express'
import short from 'short-uuid'

const generateCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = short.generate()

  try {
    return res.status(201).json({ code })
  } catch (error) {
    next(error)
  }
}

export { generateCode }
