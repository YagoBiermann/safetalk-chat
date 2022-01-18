import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = new RepositoryFactory().createUserRepository()
  const userID = req.session.user

  try {
    const {
      _id,
      username,
      room,
      isAdmin
    } = await userRepository.getUserById(userID)

    return res.status(200).json({ _id, username, room, isAdmin })
  } catch (error) {
    next(error)
  }
}

export { getUser }
