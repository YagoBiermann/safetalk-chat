import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'
import { IRoomCode } from '../../routes/interfaces'

const getUsersByRoom = async (
  req: Request<IRoomCode>,
  res: Response,
  next: NextFunction
) => {
  const { roomCode } = req.params
  const roomRepository = new RepositoryFactory().createRoomRepository()
  const userRepository = new RepositoryFactory().createUserRepository()

  try {
    const room = await roomRepository.getRoomByCode(roomCode)
    const users = await userRepository.getAllUsers(room._id)
    const usernames: Array<{ username: string; id: string }> = users.map(user =>
      Object.assign({ username: user.username, id: user._id })
    )

    return res.status(200).json({ users: usernames })
  } catch (error) {
    next(error)
  }
}

export { getUsersByRoom }
