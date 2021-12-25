import { validMimeTypes } from '../../../config'
import AppError from '../../errors/AppError'
import fs from 'fs'

class HeaderValidator {
  checkRange(n: string, media: string, roomCode: string) {
    const mediaSize = fs.statSync(`./temp/${roomCode}/files/${media}`).size
    const range = Number(n)

    if (!range) {
      throw new AppError('ERR_RANGE_NOT_FOUND')
    }
    
    if (range > mediaSize) {
      throw new AppError('ERR_INVALID_RANGE')
    }

    if (isNaN(range)) {
      throw new AppError('ERR_INVALID_RANGE')
    }

    if (range < 0) {
      throw new AppError('ERR_INVALID_RANGE')
    }

  }

  checkContentType(contentType: string) {
    const mimeType = contentType.split(';')[0]

    if (!mimeType) {
      throw new AppError('ERR_MISSING_CONTENT_TYPE')
    }

    if (!validMimeTypes.includes(mimeType)) {
      throw new AppError('ERR_CONTENT_TYPE_NOT_ALLOWED')
    }
  }
}

export { HeaderValidator }
