import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = new RepositoryFactory().createUserRepository()
  const userID = req.session.user

  try {
    const { _id, username, room, isAdmin, isOnline } =
      await userRepository.getUserById(userID)
    
    // if user refresh page, set online before hydrate on client
    if (room) {
      await userRepository.setStatus({ id: userID, isOnline: true })
    }

    return res.status(200).json({ _id, username, room, isAdmin, isOnline })
  } catch (error) {
    next(error)
  }
}

export { getUser }
