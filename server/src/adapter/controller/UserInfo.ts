import express from 'express'
import IController from '../ports/controllers/Controller'
import PresenterFactory from '../presenter/PresenterFactory'
import { IUserApplicationService } from '../../application/ports/services/UserApplicationService'

class UserInfoController implements IController {
  constructor(private userApplicationService: IUserApplicationService) {}

  async handle(router: express.Router): Promise<express.Router> {
    return router.get('/users/me', async (req, res) => {
      const { successPresenter, errorHandler } = PresenterFactory.make(res)
      const userId = req.session.user
      const accessKey = req.session.accessKey
      try {
        const userInfo = await this.userApplicationService.userInfo({
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
