import { Request, Response, NextFunction } from 'express'
import { ValidatorFactory } from '../services/validations/index'
import { validateUsername } from '../services/validations/request'
import { RepositoryFactory } from '../database'

const validateBeforeGetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userID = req.session.user
  const userValidator = new ValidatorFactory().createUserValidator()
  const userRepository = new RepositoryFactory().createUserRepository()

  try {
    await userValidator.checkIfUserExists(userID)
    const user = await userRepository.getUserById(userID)

    console.log(`validating user: ${user.username}`)
    validateUsername(user.username)

    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGetUser }
