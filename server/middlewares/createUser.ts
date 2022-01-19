import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../database'
import { IUsername } from '../routes/interfaces'
import { ValidatorFactory } from '../services/validations/index'
import {
  validateUsername,
  validateRequestBody
} from '../services/validations/request'

const validateBeforeCreateUser = async (
  req: Request<IUsername>,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body
  const userID = req.session.user
  const userValidator = new ValidatorFactory().createUserValidator()
  const userRepository = new RepositoryFactory().createUserRepository()
  try {
    console.log(`validating before create user: ${username}`)
    validateRequestBody(req.body)
    validateUsername(username)
    await userValidator.checkIfUsernameIsTaken(username)
    
    if (userID) {
      const user = await userRepository.getUserById(userID)
      console.log(`destroying session: ${user._id}`)
      req.session.destroy
      console.log(`deleting user: ${user.username} from database`)
      await userRepository.deleteUser(user._id)
    }
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeCreateUser }
