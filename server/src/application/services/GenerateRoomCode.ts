import RoomCode from '../../domain/shared/valueObjects/RoomCode'
import AuthenticationAppService from './Authentication'

class GenerateRoomCodeAppService implements IGenerateRoomCodeAppService {
  constructor(private authAppService: AuthenticationAppService) {}

  public async exec(
    userId: string,
    accessKey: string
  ): Promise<IGenerateRoomCodeOutputDTO> {
    await this.authAppService.exec(userId, accessKey)
    const roomCode = new RoomCode().value
    return { roomCode }
  }
}

export default GenerateRoomCodeAppService
