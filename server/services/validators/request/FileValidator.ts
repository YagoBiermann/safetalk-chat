import fs from 'fs'
import path from 'path'
import {
  ERR_FILE_NOT_ALLOWED,
  ERR_FILE_NOT_FOUND
} from '../../errors/constants'

class FileValidator {
  constructor() {}

  checkFilePath(filePath: string): void {
    if (!fs.existsSync(filePath)) {
      throw ERR_FILE_NOT_FOUND
    }
  }

  checkFileExtension(file: string): void {
    const fileExt = path.extname(file)

    if (!fileExt) {
      throw ERR_FILE_NOT_ALLOWED
    }
  }
}

export { FileValidator }
