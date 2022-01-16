import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'
import { IRoom } from '../../database/models/rooms'
import { IRoomBody } from '../../routes/interfaces'
import jwt from 'jsonwebtoken'

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

    const token = jwt.sign({}, process.env.JWT_ROOM_SECRET, {
      algorithm: 'HS256',
      expiresIn: '3h',
      subject: String(room.id)
    })
    const expirationTime = new Date(Date.now() + 1000 * 60 * 60 * 3) // 3 hours
    res.cookie('token', `Bearer ${token}`, { httpOnly: true, expires: expirationTime })

    return res.status(201).json({ message: 'User joined room' })
  } catch (error) {
    next(error)
  }
}

export { joinRoom }
