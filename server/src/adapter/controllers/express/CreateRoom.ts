import express from 'express'
import IApplicationService from '../../../application/ports/services/ApplicationService'
import {
  ICreateRoomInputDTO,
  ICreateRoomOutputDTO
} from '../../../application/ports/services/CreateRoomApplicationService'
import IRouteController from '../../ports/controllers/RouteController'
import PresenterFactory from '../../presenter/PresenterFactory'

class CreateRoomController implements IRouteController {
  constructor(
    private createRoomApplicationService: IApplicationService<
      ICreateRoomInputDTO,
      Promise<ICreateRoomOutputDTO>
    >
  ) {}

  async handle(router: express.Router): Promise<express.Router> {
    return router.post('/rooms/create', async (req, res) => {
      const { successPresenter, errorHandler } = PresenterFactory.make(res)
      const { roomCode } = req.body
      const userId = req.session.user
      const accessKey = req.session.accessKey
      try {
        const { roomId, newAccessKey, cloudAccessKeys } =
          await this.createRoomApplicationService.exec({
            auth: { accessKey, userId },
            roomCode
          })

        req.session.room = roomId
        req.session.roomCode = roomCode
        req.session.accessKey = newAccessKey
        req.session.cookie.maxAge = 60000 * 60 * 72 // 72 hours

        const cookieOptions = {
          httpOnly: true
        }

        for (const cloudAccessKey in cloudAccessKeys) {
          res.cookie(
            cloudAccessKey,
            cloudAccessKeys[cloudAccessKey],
            cookieOptions
          )
        }

        return successPresenter.created({})
      } catch (error) {
        return errorHandler.handle(error)
      }
    })
  }
}

export default CreateRoomController
