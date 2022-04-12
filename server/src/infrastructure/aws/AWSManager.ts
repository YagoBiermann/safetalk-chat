import AWS from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import ICloudService from '../../application/ports/services/CloudService'

class AWSManager implements ICloudService {
  private _S3Storage: AWS.S3

  constructor() {
    this._S3Storage = this.setStorage()
  }

  private setStorage() {
    return new AWS.S3({
      apiVersion: '2006-03-01',
      region: process.env.AWS_REGION,
      credentials: new AWS.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      })
    })
  }

  get storage() {
    return this._S3Storage
  }

  public getSignedCookie(roomCode: string) {
    const policy = JSON.stringify({
      Statement: [
        {
          Resource: `http*://${process.env.AWS_CLOUDFRONT_DOMAIN}/${roomCode}/*`,
          Condition: {
            DateLessThan: {
              'AWS:EpochTime': Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 1 week
            }
          }
        }
      ]
    })
    const privateKeyPath = path.join(__dirname, 'private_aws_key.pem')
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8')
    console.log('private key: ', privateKey)
    const cookie = new AWS.CloudFront.Signer(
      process.env.AWS_PUBLIC_KEY,
      privateKey
    )
    const signedCookie = cookie.getSignedCookie({ policy })
    return signedCookie
  }

  public getSignedUrl(fileName: string) {
    const privateKeyPath = path.join(__dirname, 'private_aws_key.pem')
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8')
    const cookie = new AWS.CloudFront.Signer(
      process.env.AWS_PUBLIC_KEY,
      privateKey
    )
    const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
    const signedCookie = cookie.getSignedUrl({
      expires,
      url: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${fileName}`
    })
    return signedCookie
  }

  public async deleteDirectory(roomCode: string) {
    try {
      while (true) {
        const listParams = {
          Bucket: process.env.AWS_BUCKET,
          Prefix: roomCode
        }
        const listedObjects = await this._S3Storage
          .listObjects(listParams)
          .promise()

        if (listedObjects.Contents.length === 0) return

        const deleteParams = {
          Bucket: process.env.AWS_BUCKET,
          Delete: { Objects: [] }
        }

        listedObjects.Contents.forEach(({ Key }) => {
          deleteParams.Delete.Objects.push({ Key })
        })

        await this._S3Storage.deleteObjects(deleteParams).promise()

        if (!listedObjects.IsTruncated) {
          break
        }
      }
    } catch (error) {
      throw error
    }
  }
}

export default AWSManager
