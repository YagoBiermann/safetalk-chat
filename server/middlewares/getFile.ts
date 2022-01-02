import { Request, Response, NextFunction } from 'express'
import { IFileUpload } from '../routes/interfaces'
import { ValidatorFactory } from '../services/validators'
import { validateRoomCode } from '../services/validators/request'

const validateBeforeGetFile = async (
  req: Request<IFileUpload>,
  res: Response,
  next: NextFunction
) => {

  const { roomCode, file } = req.params
  const fileValidator = new ValidatorFactory().createFileValidator()
  const roomValidator = new ValidatorFactory().createRoomValidator()
  const headerValidator = new ValidatorFactory().createHeaderValidator()

  try {
    console.log('validating before get file')
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
