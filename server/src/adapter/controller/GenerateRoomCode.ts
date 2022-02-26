import IGenerateRoomCodeController from '../ports/controllers/GenerateRoomCode'
import IErrorHandler from '../ports/presenter/ErrorHandler'

class GenerateRoomCodeController implements IGenerateRoomCodeController {
  constructor(
    private generateRoomCodeAppService: IGenerateRoomCodeAppService,
    private successPresenter: ISuccessPresenter,
    private errorPresenter: IErrorHandler
  ) {}

  public async handle({ userId, accessKey }) {
    try {
      const generateRoomCodeOutputDTO =
        await this.generateRoomCodeAppService.exec(userId, accessKey)

      return this.successPresenter.created<IGenerateRoomCodeOutputDTO>(
        generateRoomCodeOutputDTO
      )
    } catch (error) {
      return this.errorPresenter.handle(error)
    }
  }
}

export default GenerateRoomCodeController
