interface ICloudService {
  storage: AWS.S3
  getSignedCookie(roomCode: string): AWS.CloudFront.Signer.CustomPolicy
  getSignedUrl(fileName: string): string
  uploadFile(file: Express.Multer.File, roomCode: string): Promise<void>
  deleteDirectory(roomCode: string): Promise<void>
}

export default ICloudService
