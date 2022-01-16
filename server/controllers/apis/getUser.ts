import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = new RepositoryFactory().createUserRepository()
  const { username } = req.params

  try {
    const {
      _id,
      username: user,
      room,
      isAdmin
    } = await userRepository.getUserBy(username)

    return res.status(200).json({ _id, user, room, isAdmin })
  } catch (error) {
    next(error)
  }
}

export { getUser }
