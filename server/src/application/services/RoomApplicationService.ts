import {
  IAuthenticationInputDTO,
  IAuthenticationService
} from '../ports/services/AuthenticationService'
import IDomainEventSubscriber from '../../domain/models/common/DomainEventSubscriber'
import { IRoomRepository } from '../../domain/models/room/RoomRepository'
import {
  IRoomApplicationService,
  ICreateRoomInputDTO,
  IGenerateRoomCodeOutputDTO,
  IJoinRoomInputDTO,
  IGetAllUsersFromRoomInputDTO,
  IGetAllUsersFromRoomOutputDTO,
  IJoinRoomOutputDTO,
  ICreateRoomOutputDTO,
  ISaveMessageInputDTO,
  ISaveMessageOutputDTO
} from '../ports/services/RoomApplicationService'
import IValidation from '../ports/validations/Validation'
import { IRoomNotExistsValidationInput } from '../validations/leaf/RoomNotExistsValidation'
import RoomError from '../../domain/errors/models/RoomError'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import DomainEventPublisher from '../../domain/models/common/DomainEventPublisher'
import Room from '../../domain/models/room/Room'
import UserJoinedRoomEvent from '../../domain/events/UserJoinedRoomEvent'
import GetUsersFromRoomDomainService from '../../domain/models/services/GetUsersFromRoom'
import AuthError from '../../domain/errors/models/AuthError'
import ICloudService from '../ports/services/CloudService'
import UserError from '../../domain/errors/models/UserError'
import MessageError from '../../domain/errors/models/MessageError'
import IUserRepository from '../../domain/models/user/UserRepository'

class RoomApplicationService
  extends ArgumentAssertion
  implements IRoomApplicationService
{
  constructor(
    private authenticationService: IAuthenticationService,
    private cloudService: ICloudService,
    private roomAlreadyExistsValidation: IValidation,
    private roomNotExistsValidation: IValidation<IRoomNotExistsValidationInput>,
    private userAlreadyInRoomValidation: IValidation,
    private roomRepository: IRoomRepository,
    private userRepository: IUserRepository,
    private usersFromRoom: GetUsersFromRoomDomainService,
    private changeStatusWhenUserJoinedRoomEventSubscriber: IDomainEventSubscriber<UserJoinedRoomEvent>
  ) {
    super()
  }

  public async createRoom({
    roomCode,
    auth: { accessKey, userId }
  }: ICreateRoomInputDTO): Promise<ICreateRoomOutputDTO> {
    this.assertArgumentNotNull(
      roomCode,
      new RoomError('ERR_ROOM_CODE_NOT_PROVIDED')
    )
    try {
      await this.authenticate({ accessKey, userId })
      await this.roomAlreadyExistsValidation.validate(roomCode)
      await this.userAlreadyInRoomValidation.validate(userId)
      DomainEventPublisher.instance().addSubscriber(
        this.changeStatusWhenUserJoinedRoomEventSubscriber
      )
      const room = new Room({ roomCode })
      room.connect(userId)
      DomainEventPublisher.instance().publish(
        new UserJoinedRoomEvent(room, userId)
      )
      DomainEventPublisher.instance().removeAllSubscribers()
      const newAccessKey = this.generateAccessKey(
        userId,
        process.env.JWT_ROOM_SECRET,
        '3d' // 3 days
      )
      const cloudAccessKeys = this.cloudService.getSignedCookie(roomCode)
      return { roomId: room.id, newAccessKey, cloudAccessKeys }
    } catch (error) {
      throw error
    }
  }

  public async joinRoom({
    roomCode,
    auth: { accessKey, userId }
  }: IJoinRoomInputDTO): Promise<IJoinRoomOutputDTO> {
    this.assertArgumentNotNull(
      roomCode,
      new RoomError('ERR_ROOM_CODE_NOT_PROVIDED')
    )
    try {
      await this.authenticate({ accessKey, userId })
      await this.roomNotExistsValidation.validate({ roomCode })
      await this.userAlreadyInRoomValidation.validate(userId)
      DomainEventPublisher.instance().addSubscriber(
        this.changeStatusWhenUserJoinedRoomEventSubscriber
      )
      const room = await this.roomRepository.getRoomByCode(roomCode)
      room.connect(userId)
      DomainEventPublisher.instance().publish(
        new UserJoinedRoomEvent(room, userId)
      )
      DomainEventPublisher.instance().removeAllSubscribers()
      const newAccessKey = this.generateAccessKey(
        userId,
        process.env.JWT_ROOM_SECRET,
        '3d' // 3 days
      )
      const cloudAccessKeys = this.cloudService.getSignedCookie(roomCode)
      return { roomId: room.id, newAccessKey, cloudAccessKeys }
    } catch (error) {
      throw error
    }
  }

  public async saveMessage({
    auth: { accessKey, userId },
    message: { roomCode, message, messageType, file, createdAt }
  }: ISaveMessageInputDTO): Promise<ISaveMessageOutputDTO> {
    this.assertArgumentNotNull(
      roomCode,
      new RoomError('ERR_ROOM_CODE_NOT_PROVIDED')
    )
    this.assertArgumentNotNull(
      messageType,
      new MessageError('ERR_MESSAGE_EMPTY')
    )
    await this.authenticate({ userId, accessKey })
    const user = await this.userRepository.getUserById(userId)
    const room = await this.roomRepository.getRoomByCode(roomCode)
    room.addMessage({
      username: user.username,
      roomCode,
      message,
      messageType,
      file,
      createdAt
    })

    await this.roomRepository.save(room)
    const savedMessage = room.lastMessage()
    return {
      messageId: savedMessage.id,
      username: savedMessage.username,
      roomCode: savedMessage.roomCode,
      messageType: savedMessage.type,
      file: savedMessage.file,
      message: savedMessage.content,
      createdAt: savedMessage.creationTime
    }
  }

  public async getAllUsersFromRoom({
    roomId,
    auth: { accessKey, userId }
  }: IGetAllUsersFromRoomInputDTO): Promise<IGetAllUsersFromRoomOutputDTO> {
    this.assertArgumentNotNull(roomId, new AuthError('ERR_NOT_AUTHORIZED'))
    await this.authenticate({ accessKey, userId })
    await this.roomNotExistsValidation.validate({ roomId })
    const users = await this.usersFromRoom.exec(roomId)
    const room = await this.roomRepository.getRoomById(roomId)
    const allUsersFromRoom = users.map(user => ({
      userId: user.id,
      username: user.username,
      roomId: room.id,
      roomCode: room.roomCode,
      isOnline: user.isOnline
    }))

    return allUsersFromRoom
  }

  public async generateRoomCode({
    accessKey,
    userId
  }: IAuthenticationInputDTO): Promise<IGenerateRoomCodeOutputDTO> {
    await this.authenticate({ userId, accessKey })
    const roomCode = Room.generateRoomCode().value

    return { roomCode }
  }

  private authenticate({ accessKey, userId }: IAuthenticationInputDTO) {
    return this.authenticationService.authenticate({ userId, accessKey })
  }

  private generateAccessKey(
    data: string,
    secret: string,
    expiresIn: string | number
  ) {
    return this.authenticationService.generateAccessKey(data, secret, expiresIn)
  }
}

export default RoomApplicationService
