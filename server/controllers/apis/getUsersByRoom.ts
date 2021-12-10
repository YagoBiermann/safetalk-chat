import { Request, Response, NextFunction } from 'express'
import { userRepository } from '../../database/index'
import { roomRepository } from '../../database/index'
import { IRoomCode } from '../../routes/interfaces'

const getUsersByRoom = async (
  req: Request<IRoomCode>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roomCode } = req.params
    const room = await roomRepository.getRoomByCode(roomCode)
    const users = await userRepository.getUsersByRoomID(room.id)
    const usernames = users.map(user => user.username)
    return res.status(200).json({ users: usernames })
  } catch (error) {
    next(error)
  }
}

export { getUsersByRoom }
