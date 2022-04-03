import express from 'express'
import IApplicationService from '../../../application/ports/services/ApplicationService'
import {
  IUserInfoInputDTO,
  IUserInfoOutputDTO
} from '../../../application/ports/services/UserInfoApplicationService'
import IRouteController from '../../ports/controllers/RouteController'
import PresenterFactory from '../../presenter/PresenterFactory'

class UserInfoController implements IRouteController {
  constructor(
    private userInfoApplicationService: IApplicationService<
      IUserInfoInputDTO,
      Promise<IUserInfoOutputDTO>
    >
  ) {}

  async handle(router: express.Router): Promise<express.Router> {
    return router.get('/users/me', async (req, res) => {
      const { successPresenter, errorHandler } = PresenterFactory.make(res)
      const userId = req.session.user
      const accessKey = req.session.accessKey
      try {
        const userInfo = await this.userInfoApplicationService.exec({
          userId,
          accessKey
        })

        return successPresenter.success(userInfo)
      } catch (error) {
        return errorHandler.handle(error)
      }
    })
  }
}

export default UserInfoController
