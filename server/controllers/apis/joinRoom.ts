import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'
import { IRoomBody } from '../../routes/interfaces'
import jwt from 'jsonwebtoken'

const joinRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, roomCode } = req.body
  const roomRepository = new RepositoryFactory().createRoomRepository()
  const userRepository = new RepositoryFactory().createUserRepository()

  try {
    const room = await roomRepository
      .getRoomByCode(roomCode)
      .then(async room => {
        await userRepository.updateUser({
          username,
          room: room._id,
          isAdmin: false
        })
        return room._id
      })

    const token = jwt.sign({}, process.env.JWT_ROOM_SECRET, {
      algorithm: 'HS256',
      expiresIn: '3h',
      subject: String(room)
    })
    const expirationTime = new Date(Date.now() + 1000 * 60 * 60 * 3) // 3 hours
    res.cookie('token', `Bearer ${token}`, {
      httpOnly: true,
      expires: expirationTime
    })

    req.session.cookie.maxAge = 1000 * 60 * 60 * 3 // 3 hours

    return res.status(201).json({ message: 'User joined room' })
  } catch (error) {
    next(error)
  }
}

export { joinRoom }
