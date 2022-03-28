import express, { Request, Response } from 'express'
import IRouteController from '../../ports/controllers/RouteController'
import PresenterFactory from '../../presenter/PresenterFactory'
import multer from 'multer'
import multerS3 from 'multer-s3'
import ICloudService from '../../../application/ports/services/CloudService'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { IAuthenticationService } from '../../../application/ports/services/AuthenticationService'

class UploadFileController implements IRouteController {
  constructor(
    private cloudService: ICloudService,
    private authenticationService: IAuthenticationService
  ) {}

  private multer() {
    const oneGb = 1024 ** 3
    return multer({
      fileFilter: (req, file, cb) => {
        try {
          if (!file) {
            cb(null, false)
          }
          const accessKey = req.session.accessKey
          const userId = req.session.user
          this.authenticationService.authenticate({ accessKey, userId })
          cb(null, true)
        } catch (error) {
          cb(error, false)
        }
      },
      limits: { fileSize: oneGb, files: 1 },
      storage: multerS3({
        bucket: process.env.AWS_BUCKET,
        s3: this.cloudService.storage,
        acl: 'private',
        contentType: multerS3.AUTO_CONTENT_TYPE,

        key: (req, file, cb) => {
          const roomCode = req.session.roomCode
          const fileExt = path.extname(file.originalname)
          const fileName = `${roomCode}/${uuidv4()}${fileExt}`
          cb(null, fileName)
        }
      })
    })
  }

  async handle(router: express.Router): Promise<express.Router> {
    return router.post(
      '/rooms/file',
      this.multer().single('file'),
      async (req: Request, res: Response) => {
        const { successPresenter, errorHandler } = PresenterFactory.make(res)
        try {
          const file = req.file as Express.MulterS3.File
          const fileUrl = this.cloudService.getSignedUrl(file.key)
          return successPresenter.success({ fileUrl })
        } catch (error) {
          return errorHandler.handle(error)
        }
      }
    )
  }
}

export default UploadFileController
