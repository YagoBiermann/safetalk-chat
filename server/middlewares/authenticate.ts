import { Request, Response, NextFunction } from 'express'
import AuthFactory from '../services/authentication'
import { RepositoryFactory } from '../database'
import { ValidatorFactory } from '../services/validations'

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const withoutAuthPaths = ['/api/v2/users/create', '/']
  if (withoutAuthPaths.includes(req.path)) return next()

  try {
    const userId = req.session.user
    const token = req.session.token
    const authenticator = new AuthFactory().createAuthenticationService()
    const userRepository = new RepositoryFactory().createUserRepository()
    const headerValidator = new ValidatorFactory().createHeaderValidator()

    console.log(`validating token: ${token}`)
    headerValidator.checkCookie(token)
    const user = await userRepository.getUserById(userId)
    if (user.room) {
      authenticator.validateToken(token, process.env.JWT_ROOM_SECRET)
      req.session.cookie.maxAge += 1000 * 60 * 10 // add more 10 minutes on each request
    } else {
      authenticator.validateToken(token, process.env.JWT_SECRET)
    }

    next()
  } catch (error) {
    next(error)
  }
}

export { authenticate }
