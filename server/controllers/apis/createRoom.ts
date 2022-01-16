import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'
import { IRoomBody } from '../../routes/interfaces'
import jwt from 'jsonwebtoken'

const createRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { username, roomCode } = req.body
  const roomRepository = new RepositoryFactory().createRoomRepository()
  const userRepository = new RepositoryFactory().createUserRepository()

  try {
    const roomId = await roomRepository.createRoom(roomCode).then(room => {
      userRepository.updateUser({
        username,
        room: room._id,
        isAdmin: true
      })
      return room._id
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
