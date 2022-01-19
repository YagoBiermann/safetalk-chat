import { Request, Response, NextFunction } from 'express'
import { RepositoryFactory } from '../../database/index'
import { IRoomBody } from '../../routes/interfaces'
import jwt from 'jsonwebtoken'
import AuthFactory from '../../services/authentication'

const createRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { username, roomCode } = req.body
  const roomRepository = new RepositoryFactory().createRoomRepository()
  const userRepository = new RepositoryFactory().createUserRepository()
  const auth = new AuthFactory().createAuthenticationService()
  try {
    const room = await roomRepository.createRoom(roomCode).then(room => {
      userRepository.updateUser({
        username,
        room: room._id,
        isAdmin: true,
        isOnline: true
      })
      return room._id
    })

    const token = auth.generateToken(
      String(room),
      process.env.JWT_ROOM_SECRET,
      '3h'
    )
    req.session.token = token
    req.session.cookie.maxAge = 1000 * 60 * 60 * 3 // 3 hours

    return res.status(201).json({ message: 'Room created' })
  } catch (error) {
    next(error)
  }
}

export { createRoom }
