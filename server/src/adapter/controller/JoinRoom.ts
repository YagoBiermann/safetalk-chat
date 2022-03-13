import express from 'express'
import IController from '../ports/controllers/Controller'
import PresenterFactory from '../presenter/PresenterFactory'
import { IRoomApplicationService } from '../../application/ports/services/RoomApplicationService'

class JoinRoomController implements IController {
  constructor(private roomApplicationService: IRoomApplicationService) {}

  async handle(router: express.Router): Promise<express.Router> {
    return router.post('/rooms/join', async (req, res) => {
      const { successPresenter, errorHandler } = PresenterFactory.make(res)
      const { roomCode } = req.body
      const userId = req.session.user
      const accessKey = req.session.accessKey
      try {
        const { roomId } = await this.roomApplicationService.joinRoom({
          auth: { accessKey, userId },
          roomCode
        })
        req.session.room = roomId
        req.session.cookie.maxAge = 60000 * 60 * 72 // 72 hours
        return successPresenter.success({})
      } catch (error) {
        return errorHandler.handle(error)
      }
    })
  }
}

export default JoinRoomController
