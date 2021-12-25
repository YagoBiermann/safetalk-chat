import {
  ERR_RANGE_NOT_FOUND,
  ERR_INVALID_RANGE,
  ERR_MISSING_CONTENT_TYPE,
  ERR_CONTENT_TYPE_NOT_ALLOWED
} from '../../errors/constants'

const validTypes = [
  'image/jpeg',
  'image/png',
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/wmv',
  'video/avi',
  'video/mov',
  'video/quicktime',
  'audio/mp3',
  'audio/mp4',
  'text/plain',
  'application/pdf',
  'application/zip',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-powerpoint'
]

class HeaderValidator {
  checkRange(n: string) {
    const range = Number(n)

    if (isNaN(range)) {
      throw ERR_INVALID_RANGE
    }

    if (range < 0) {
      throw ERR_INVALID_RANGE
    }

    if (!range) {
      throw ERR_RANGE_NOT_FOUND
    }
  }

  checkContentType(contentType: string) {
    const mimeType = contentType.split(';')[0]

    if (!mimeType) {
      throw ERR_MISSING_CONTENT_TYPE
    }

    if (!validTypes.includes(mimeType)) {
      throw ERR_CONTENT_TYPE_NOT_ALLOWED
    }
  }

  checkToken() {}
}

export { HeaderValidator }
