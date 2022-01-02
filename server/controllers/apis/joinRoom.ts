import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'
import { IRoom } from '../../database/models/rooms'
import { IRoomBody } from '../../routes/interfaces'

const joinRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
) => {
  const { socketID, username, roomCode } = req.body
  const roomRepository = new RepositoryFactory().createRoomRepository()
  const userRepository = new RepositoryFactory().createUserRepository()

  try {
    let room: IRoom = await roomRepository.getRoomByCode(roomCode)
    await userRepository.updateUser({
      socketID,
      username,
      room: room.id,
      isAdmin: false
    })

    return res.status(201).json({ message: 'User joined room' })
  } catch (error) {
    next(error)
  }
}

export { joinRoom }
