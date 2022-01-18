import { Request, Response, NextFunction } from 'express'
import { validateToken } from '../services/validators/request'

const validateBeforeGenerateCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token

  try {
    console.log(`validating token: ${token}`)
    validateToken(token, process.env.JWT_SECRET)

    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGenerateCode }
