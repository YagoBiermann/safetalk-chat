import { Request, Response, NextFunction } from 'express'
import { IMediaStream } from '../routes/interfaces'
import { fileValidator, headerValidator } from '../services/validators'
import { roomValidator } from '../services/validators'
import { validateRoomCode } from '../services/validators/request'

const validateStream = async (
  req: Request<IMediaStream>,
  res: Response,
  next: NextFunction
) => {
  const { roomCode, media } = req.params
  const range = req.headers.range
  try {
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomDoesNotExists(roomCode)
    headerValidator.checkContentType(req.headers['content-type'])
    headerValidator.checkRange(range, media, roomCode)
    fileValidator.checkFilePath(media, roomCode)
    fileValidator.checkFileExtension(media)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateStream }
