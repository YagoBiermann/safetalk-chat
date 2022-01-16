import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'
import { IRoomBody } from '../../routes/interfaces'
import jwt from 'jsonwebtoken'

const createUser = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { username } = req.body
  const userRepository = new RepositoryFactory().createUserRepository()

  try {
    const user = await userRepository.createUser({
      username,
      isAdmin: false,
      room: null
    })
    const token = jwt.sign({}, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: 600,
      subject: String(user._id)
    })
    const expirationTime = new Date(Date.now() + 1000 * 60 * 10) // 10 minutes

    res.cookie('token', `Bearer ${token}`, {
      httpOnly: true,
      expires: expirationTime
    })

    res.cookie('username', username, {
      path: '/'
    })

    return res.status(201).json({ message: 'User created' })
  } catch (error) {
    next(error)
  }
}

export { createUser }
