import GenerateRoomCodeAppService from '../../application/services/GenerateRoomCode'
import GenerateRoomCodeController from '../../adapter/controller/GenerateRoomCode'
import GenerateRoomCodeEndpoint from '../../infrastructure/express/routes/endpoints/GenerateRoomCode'
import AuthenticationFactory from './Authentication'
import PresenterFactory from '../../adapter/presenter/PresenterFactory'

class GenerateRoomCodeFactory {
  public make(): GenerateRoomCodeEndpoint {
    const authentication = new AuthenticationFactory().make()
    const { errorHandler, successPresenter } = new PresenterFactory().make()
    const generateRoomCodeAppService = new GenerateRoomCodeAppService(
      authentication
    )
    const generateRoomCodeController = new GenerateRoomCodeController(
      generateRoomCodeAppService,
      successPresenter,
      errorHandler
    )

    return new GenerateRoomCodeEndpoint(generateRoomCodeController)
  }
}

export default GenerateRoomCodeFactory
