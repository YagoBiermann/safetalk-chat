interface ICloudService {
  storage?: AWS.S3
  getSignedCookie(roomCode: string): AWS.CloudFront.Signer.CustomPolicy
  getSignedUrl(fileName: string): string
  deleteDirectory(roomCode: string): Promise<void>
}

export default ICloudService
