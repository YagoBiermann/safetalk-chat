import express from 'express'
import IApplicationService from '../../../application/ports/services/ApplicationService'
import {
  IGenerateRoomCodeInputDTO,
  IGenerateRoomCodeOutputDTO
} from '../../../application/ports/services/GenerateRoomCodeApplicationService'
import IRouteController from '../../ports/controllers/RouteController'
import PresenterFactory from '../../presenter/PresenterFactory'

class GenerateRoomCodeController implements IRouteController {
  constructor(
    private generateRoomCodeApplicationService: IApplicationService<
      IGenerateRoomCodeInputDTO,
      Promise<IGenerateRoomCodeOutputDTO>
    >
  ) {}

  public async handle(router: express.Router): Promise<express.Router> {
    return router.get('/rooms/code', async (req, res) => {
      const { successPresenter, errorHandler } = PresenterFactory.make(res)
      const userId = req.session.user
      const accessKey = req.session.accessKey
      try {
        const roomCode = await this.generateRoomCodeApplicationService.exec({
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
