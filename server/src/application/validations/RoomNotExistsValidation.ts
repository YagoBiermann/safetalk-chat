import { IRoomRepository } from '../../domain/models/room/RoomRepository'
import RoomError from '../../domain/errors/models/RoomError'
import IValidation from '../ports/validations/Validation'

interface IRoomNotExistsValidationInput {
  roomCode?: string
  roomId?: string
}
class RoomNotExistsValidation
  implements IValidation<IRoomNotExistsValidationInput>
{
  constructor(private roomRepository: IRoomRepository) {}

  public async validate({
    roomCode,
    roomId
  }: IRoomNotExistsValidationInput): Promise<RoomError> | null {
    const room = roomId
      ? await this.roomRepository.getRoomById(roomId)
      : await this.roomRepository.getRoomByCode(roomCode)

    if (!room) {
      throw new RoomError('ERR_ROOM_NOT_FOUND')
    }
    return null
  }
}
export { IRoomNotExistsValidationInput }
export default RoomNotExistsValidation
