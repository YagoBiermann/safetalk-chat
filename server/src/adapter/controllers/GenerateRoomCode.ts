import express from 'express'
import { IRoomApplicationService } from '../../application/ports/services/RoomApplicationService'
import IRouteController from '../ports/controllers/RouteController'
import PresenterFactory from '../presenter/PresenterFactory'

class GenerateRoomCodeController implements IRouteController {
  constructor(private roomApplicationService: IRoomApplicationService) {}

  public async handle(router: express.Router): Promise<express.Router> {
    return router.get('/rooms/code', async (req, res) => {
      const { successPresenter, errorHandler } = PresenterFactory.make(res)
      const userId = req.session.user
      const accessKey = req.session.accessKey
      try {
        const roomCode = await this.roomApplicationService.generateRoomCode({
          accessKey,
          userId
        })

        return successPresenter.created(roomCode)
      } catch (error) {
        return errorHandler.handle(error)
      }
    })
  }
}

export default GenerateRoomCodeController
