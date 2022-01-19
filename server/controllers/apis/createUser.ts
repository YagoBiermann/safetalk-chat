import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'
import { IRoomBody } from '../../routes/interfaces'
import AuthFactory from '../../services/authentication'

const createUser = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { username } = req.body
  const userRepository = new RepositoryFactory().createUserRepository()
  const auth = new AuthFactory().createAuthenticationService()

  try {
    const user = await userRepository.createUser({
      username,
      isAdmin: false,
      room: null,
      isOnline: false
    })

    const token = auth.generateToken(
      String(user._id),
      process.env.JWT_SECRET,
      600
    )
    req.session.token = token
    req.session.user = String(user._id)

    return res.status(201).json({ message: 'User created' })
  } catch (error) {
    next(error)
  }
}

export { createUser }
