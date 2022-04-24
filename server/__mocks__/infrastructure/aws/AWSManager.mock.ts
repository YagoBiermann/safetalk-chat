import ICloudService from '../../../src/application/ports/services/CloudService'
import AWS from 'aws-sdk'

class AWSManagerMock implements ICloudService {
  constructor() {}
  deleteDirectory(roomCode: string): Promise<void> {
    return Promise.resolve()
  }

  getSignedCookie(roomCode: string): any {
    return 'signedCookie'
  }

  getSignedUrl(fileName: string): string {
    return 'signedUrl'
  }
}

export default AWSManagerMock
