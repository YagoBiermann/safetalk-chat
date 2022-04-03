import express from 'express'
import IApplicationService from '../../../application/ports/services/ApplicationService'
import {
  ICreateUserInputDTO,
  ICreateUserOutputDTO
} from '../../../application/ports/services/CreateUserApplicationService'
import IRouteController from '../../ports/controllers/RouteController'
import PresenterFactory from '../../presenter/PresenterFactory'

class CreateUserController implements IRouteController {
  constructor(
    private createUserApplicationService: IApplicationService<
      ICreateUserInputDTO,
      Promise<ICreateUserOutputDTO>
    >
  ) {}

  async handle(router: express.Router): Promise<express.Router> {
    return router.post('/users/create', async (req, res) => {
      const { successPresenter, errorHandler } = PresenterFactory.make(res)
      const { username } = req.body
      const userId = req.session.user
      try {
        const response = await this.createUserApplicationService.exec({
          username,
          userId
        })
        req.session.regenerate(() => console.log('session regenerated'))
        req.session.user = response.userId
        req.session.accessKey = response.accessKey

        return successPresenter.created({})
      } catch (error) {
        return errorHandler.handle(error)
      }
    })
  }
}

export default CreateUserController
