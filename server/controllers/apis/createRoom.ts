import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'
import { IRoomBody } from '../../routes/interfaces'
import jwt from 'jsonwebtoken'
import { Schema } from 'mongoose'

const createRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { socketID, username, roomCode } = req.body
  const roomRepository = new RepositoryFactory().createRoomRepository()
  const userRepository = new RepositoryFactory().createUserRepository()
  let roomId: Schema.Types.ObjectId
  try {
    await roomRepository.createRoom(roomCode).then(room => {
      userRepository.updateUser({
        socketID,
        username,
        room: room.id,
        isAdmin: true
      })
      roomId = room.id
    })

    const token = jwt.sign({}, process.env.JWT_ROOM_SECRET, {
      algorithm: 'HS256',
      expiresIn: '3h',
      subject: String(roomId)
    })
    const expirationTime = new Date(Date.now() + 1000 * 60 * 60 * 3) // 3 hours
    res.cookie('token', `Bearer ${token}`, {
      httpOnly: true,
      expires: expirationTime
    })

    return res.status(201).json({ message: 'Room created' })
  } catch (error) {
    next(error)
  }
}

export { createRoom }
