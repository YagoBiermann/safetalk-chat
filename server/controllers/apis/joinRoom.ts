import { Request, Response, NextFunction } from 'express'
import { userRepository } from '../../database/index'
import { roomRepository } from '../../database/index'
import { IRoom } from '../../database/models/rooms'
import { IRoomBody } from '../../routes/interfaces'

const joinRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { socketID, username, roomCode } = req.body
    let room: IRoom = await roomRepository.getRoomByCode(roomCode)
    userRepository.updateUser({
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
