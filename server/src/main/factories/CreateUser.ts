import CreateUserEndpoint from '../../infrastructure/express/routes/endpoints/CreateUser'
import CreateUserController from '../../adapter/controller/CreateUser'
import CreateUserAppService from '../../application/services/CreateUser'
import UserRepository from '../../infrastructure/database/repositories/UserRepository'
import Authenticator from '../../infrastructure/jwt/Authenticator'
import UserMapper from '../../infrastructure/database/mapper/UserMapper'
import ErrorHandler from '../../adapter/presenter/ErrorHandler'
import ErrorPresenter from '../../adapter/presenter/ErrorPresenter'
import SuccessPresenter from '../../adapter/presenter/SuccessPresenter'
import UsernameTakenValidator from '../../application/validations/leaf/UsernameTakenValidator'

class CreateUserFactory {
  public make(): CreateUserEndpoint {
    const userMapper = new UserMapper()
    const userRepo = new UserRepository(userMapper)
    const auth = new Authenticator()
    const successPresenter = new SuccessPresenter()
    const errorPresenter = new ErrorPresenter()
    const errorHandler = new ErrorHandler(errorPresenter)
    const validator = new UsernameTakenValidator(userRepo)

    const createUserAppService = new CreateUserAppService(
      userRepo,
      auth,
      validator
    )

    const createUserController = new CreateUserController(
      createUserAppService,
      successPresenter,
      errorHandler
    )

    return new CreateUserEndpoint(createUserController)
  }
}

export default CreateUserFactory
