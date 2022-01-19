import fs from 'fs'
import path from 'path'
import AppError from '../../errors/AppError'
import { IFileValidator } from '../interfaces'

class FileValidator implements IFileValidator {
  constructor() {}

  public checkFilePath(filePath: string, roomCode: string): void {
    if (!fs.existsSync(`./temp/${roomCode}/files/${filePath}`)) {
      throw new AppError('ERR_FILE_NOT_FOUND')
    }
  }

  public checkFileExtension(file: string): void {
    const fileExt = path.extname(file)

    if (!fileExt) {
      throw new AppError('ERR_FILE_NOT_ALLOWED')
    }
  }
}

export { FileValidator }
