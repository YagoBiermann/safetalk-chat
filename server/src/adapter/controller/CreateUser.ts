import { ICreateUserOutputDTO } from '../../application/ports/services/CreateUser'
import UserError from '../../domain/errors/models/UserError'
import { ICreateUserAppService } from '../../application/ports/services/CreateUser'
import ICreateUserController from '../ports/controllers/CreateUser'
import IErrorHandler from '../ports/presenter/ErrorHandler'

class CreateUserController implements ICreateUserController {
  constructor(
    private createUserService: ICreateUserAppService,
    private successPresenter: ISuccessPresenter,
    private errorPresenter: IErrorHandler
  ) {}

  async handle({ username, userId }) {
    try {
      if (!username) {
        return this.errorPresenter.handle(
          new UserError('ERR_USERNAME_NOT_PROVIDED')
        )
      }
      const createUserDTO = await this.createUserService.exec(username, userId)

      return this.successPresenter.created<ICreateUserOutputDTO>(createUserDTO)
    } catch (error) {
      return this.errorPresenter.handle(error)
    }
  }
}

export default CreateUserController
