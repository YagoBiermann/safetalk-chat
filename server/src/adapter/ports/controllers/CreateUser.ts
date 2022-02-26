import { ICreateUserOutputDTO } from '../../../application/ports/services/CreateUser'
import IController from './Controller'

interface ICreateUserController
  extends IController<
    { username: string; userId: string },
    Promise<
      HttpResponseDTO<ICreateUserOutputDTO> | HttpResponseDTO<IErrorMessage>
    >
  > {}

export default ICreateUserController
