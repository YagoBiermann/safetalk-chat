import { Request, Response, NextFunction } from 'express'
import { IFileUpload } from '../routes/interfaces'
import { fileValidator, headerValidator } from '../services/validators'
import { roomValidator } from '../services/validators'
import { validateRoomCode } from '../services/validators/request'

const validateBeforeGetFile = async (
  req: Request<IFileUpload>,
  res: Response,
  next: NextFunction
) => {
  const { roomCode, file } = req.params
  try {
    headerValidator.checkContentType(req.headers['content-type'])
    fileValidator.checkFilePath(file, roomCode)
    fileValidator.checkFileExtension(file)
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomDoesNotExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGetFile }
