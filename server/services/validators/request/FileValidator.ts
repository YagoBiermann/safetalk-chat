import fs from 'fs'
import path from 'path'
import AppError from '../../errors/AppError'

class FileValidator {
  constructor() {}

  checkFilePath(filePath: string): void {
    if (!fs.existsSync(filePath)) {
      throw new AppError('ERR_FILE_NOT_FOUND')
    }
  }

  checkFileExtension(file: string): void {
    const fileExt = path.extname(file)

    if (!fileExt) {
      throw new AppError('ERR_FILE_NOT_ALLOWED')
    }
  }
}

export { FileValidator }
