import express from 'express'
import IRouteController from '../../ports/controllers/RouteController'
import PresenterFactory from '../../presenter/PresenterFactory'
import { IRoomApplicationService } from '../../../application/ports/services/RoomApplicationService'

class JoinRoomController implements IRouteController {
  constructor(private roomApplicationService: IRoomApplicationService) {}

  async handle(router: express.Router): Promise<express.Router> {
    return router.post('/rooms/join', async (req, res) => {
      const { successPresenter, errorHandler } = PresenterFactory.make(res)
      const { roomCode } = req.body
      const userId = req.session.user
      const accessKey = req.session.accessKey
      try {
        const { roomId, newAccessKey, cloudAccessKeys } =
          await this.roomApplicationService.joinRoom({
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

        return successPresenter.success({})
      } catch (error) {
        return errorHandler.handle(error)
      }
    })
  }
}

export default JoinRoomController
