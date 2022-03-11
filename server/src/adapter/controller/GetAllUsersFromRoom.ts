import express from 'express'
import IController from '../ports/controllers/Controller'
import PresenterFactory from '../presenter/PresenterFactory'
import { IRoomApplicationService } from '../../application/ports/services/RoomApplicationService'

class GetAllUsersFromRoomController implements IController {
  constructor(private roomApplicationService: IRoomApplicationService) {}

  async handle(router: express.Router): Promise<express.Router> {
    return router.get('/rooms/current/users', async (req, res) => {
      const { successPresenter, errorHandler } = PresenterFactory.make(res)
      const userId = req.session.user
      const accessKey = req.session.accessKey
      const roomId = req.session.room
      try {
        const users = await this.roomApplicationService.getAllUsersFromRoom({
          roomId,
          auth: { accessKey, userId }
        })

        return successPresenter.success({ users })
      } catch (error) {
        return errorHandler.handle(error)
      }
    })
  }
}

export default GetAllUsersFromRoomController
