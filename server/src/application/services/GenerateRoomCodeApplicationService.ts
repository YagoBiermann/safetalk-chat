import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import Room from '../../domain/models/room/Room'
import IApplicationService from '../ports/services/ApplicationService'
import { IAuthenticationService } from '../ports/services/AuthenticationService'
import {
  IGenerateRoomCodeInputDTO,
  IGenerateRoomCodeOutputDTO
} from '../ports/services/GenerateRoomCodeApplicationService'

class GenerateRoomCodeApplicationService
  extends ArgumentAssertion
  implements IApplicationService
{
  constructor(private authenticationService: IAuthenticationService) {
    super()
  }

  public async exec({
    accessKey,
    userId
  }: IGenerateRoomCodeInputDTO): Promise<IGenerateRoomCodeOutputDTO> {
    await this.authenticationService.authenticate({ userId, accessKey })
    const roomCode = Room.generateRoomCode().value

    return { roomCode }
  }
}

export default GenerateRoomCodeApplicationService
