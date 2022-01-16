import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = new RepositoryFactory().createUserRepository()
  const { username } = req.params

  try {
    const {
      username: user,
      socketID,
      room,
      isAdmin
    } = await userRepository.getUserByUsername(username)

    return res.status(200).json({ user, socketID, room, isAdmin })
  } catch (error) {
    next(error)
  }
}

export { getUser }
