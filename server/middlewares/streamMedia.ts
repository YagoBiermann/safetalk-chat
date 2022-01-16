import { Request, Response, NextFunction } from 'express'
import { IMediaStream } from '../routes/interfaces'
import { ValidatorFactory } from '../services/validators'
import { validateRoomCode, validateToken } from '../services/validators/request'

const validateStream = async (
  req: Request<IMediaStream>,
  res: Response,
  next: NextFunction
) => {
  const { roomCode, media } = req.params
  const token = req.cookies.token
  const range = req.headers.range
  const roomValidator = new ValidatorFactory().createRoomValidator()
  const headerValidator = new ValidatorFactory().createHeaderValidator()
  const fileValidator = new ValidatorFactory().createFileValidator()

  try {
    console.log('validating before stream media')
    validateToken(token, process.env.JWT_ROOM_SECRET)
    validateRoomCode(roomCode)
    headerValidator.checkContentType(req.headers['content-type'])
    headerValidator.checkRange(range, media, roomCode)
    fileValidator.checkFilePath(media, roomCode)
    fileValidator.checkFileExtension(media)
    await roomValidator.checkIfRoomExists(roomCode)

    next()
  } catch (error) {
    next(error)
  }
}

export { validateStream }
