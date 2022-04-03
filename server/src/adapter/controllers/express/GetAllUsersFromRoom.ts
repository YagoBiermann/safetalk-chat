import express from 'express'
import IApplicationService from '../../../application/ports/services/ApplicationService'
import {
  IGetAllUsersFromRoomInputDTO,
  IGetAllUsersFromRoomOutputDTO
} from '../../../application/ports/services/GetAllUsersFromRoomApplicationService'
import IRouteController from '../../ports/controllers/RouteController'
import PresenterFactory from '../../presenter/PresenterFactory'
class GetAllUsersFromRoomController implements IRouteController {
  constructor(
    private getAllUsersFromRoomApplicationService: IApplicationService<
      IGetAllUsersFromRoomInputDTO,
      Promise<IGetAllUsersFromRoomOutputDTO>
    >
  ) {}

  async handle(router: express.Router): Promise<express.Router> {
    return router.get('/rooms/current/users', async (req, res) => {
      const { successPresenter, errorHandler } = PresenterFactory.make(res)
      const userId = req.session.user
      const accessKey = req.session.accessKey
      const roomId = req.session.room
      try {
        const users = await this.getAllUsersFromRoomApplicationService.exec({
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
