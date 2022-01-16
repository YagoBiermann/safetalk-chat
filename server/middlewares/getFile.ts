import { Request, Response, NextFunction } from 'express'
import { IFileUpload } from '../routes/interfaces'
import { ValidatorFactory } from '../services/validators'
import { validateRoomCode, validateToken } from '../services/validators/request'

const validateBeforeGetFile = async (
  req: Request<IFileUpload>,
  res: Response,
  next: NextFunction
) => {
  const { roomCode, file } = req.params
  const token = req.cookies.token
  const fileValidator = new ValidatorFactory().createFileValidator()
  const roomValidator = new ValidatorFactory().createRoomValidator()
  const headerValidator = new ValidatorFactory().createHeaderValidator()

  try {
    console.log('validating before get file')
    validateToken(token, process.env.JWT_ROOM_SECRET)
    headerValidator.checkContentType(req.headers['content-type'])
    fileValidator.checkFilePath(file, roomCode)
    fileValidator.checkFileExtension(file)
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGetFile }
