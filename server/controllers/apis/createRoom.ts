import { Request, Response, NextFunction } from 'express'
import { userRepository } from '../../database/index'
import { roomRepository } from '../../database/index'
import { IRoomBody } from '../../routes/interfaces'

const createRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { socketID, username, roomCode } = req.body

    await roomRepository.createRoom(roomCode).then(room => {
      userRepository.updateUser({
        socketID,
        username,
        room: room.id,
        isAdmin: true
      })
    })

    return res.status(201).json({ message: 'Room created' })
  } catch (error) {
    next(error)
  }
}

export { createRoom }
