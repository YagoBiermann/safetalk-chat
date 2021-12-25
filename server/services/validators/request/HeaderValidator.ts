import { validMimeTypes } from '../../../config'
import AppError from '../../errors/AppError'

class HeaderValidator {
  checkRange(n: string) {
    const range = Number(n)

    if (isNaN(range)) {
      throw new AppError('ERR_INVALID_RANGE')
    }

    if (range < 0) {
      throw new AppError('ERR_INVALID_RANGE')
    }

    if (!range) {
      throw new AppError('ERR_RANGE_NOT_FOUND')
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
