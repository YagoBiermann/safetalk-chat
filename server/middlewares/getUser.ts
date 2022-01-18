import { Request, Response, NextFunction } from 'express'
import { ValidatorFactory } from '../services/validators/index'
import {
  validateToken,
  validateUsername
} from '../services/validators/request/'
import { RepositoryFactory } from '../database'

const validateBeforeGetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userID = req.session.user
  const userValidator = new ValidatorFactory().createUserValidator()
  const token = req.cookies.token
  const userRepository = new RepositoryFactory().createUserRepository()

  try {
    console.log(req.session.user)
    await userValidator.checkIfUserExists(userID)
    const user = await userRepository.getUserById(userID)

    console.log(`validating token: ${token}`)
    if (user.room) {
      validateToken(token, process.env.JWT_ROOM_SECRET)
    } else {
      validateToken(token, process.env.JWT_SECRET)
    }

    console.log(`validating user: ${user.username}`)
    validateUsername(user.username)

    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGetUser }
