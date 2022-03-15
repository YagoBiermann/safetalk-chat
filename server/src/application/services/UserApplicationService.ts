import IUserRepository from '../../domain/models/user/UserRepository'
import {
  IAuthenticationInputDTO,
  IAuthenticationService
} from '../ports/services/AuthenticationService'
import User from '../../domain/models/user/User'
import IValidation from '../ports/validations/Validation'
import {
  ICreateUserInputDTO,
  ICreateUserOutputDTO,
  IDeleteUserInputDTO,
  IUserApplicationService,
  IUserInfoOutputDTO
} from '../ports/services/UserApplicationService'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import UserError from '../../domain/errors/models/UserError'
import DomainEventPublisher from '../../domain/models/common/DomainEventPublisher'
import UserDeletedEvent from '../../domain/events/UserDeletedEvent'
import IDomainEventSubscriber from '../../domain/models/common/DomainEventSubscriber'
import RoomError from '../../domain/errors/models/RoomError'

class UserApplicationService
  extends ArgumentAssertion
  implements IUserApplicationService
{
  constructor(
    private userRepository: IUserRepository,
    private authentication: IAuthenticationService,
    private usernameTakenValidation: IValidation,
    private userNotExistsValidation: IValidation,
    private roomNotExistsValidation: IValidation,
    private onUserDeletedSubscriber: IDomainEventSubscriber<UserDeletedEvent>
  ) {
    super()
  }
  public async createUser({
    username,
    userId
  }: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
    this.assertArgumentNotNull(
      username,
      new UserError('ERR_USERNAME_NOT_PROVIDED')
    )
    await this.usernameTakenValidation.validate(username)

    if (userId) {
      await this.userRepository.delete(userId)
    }

    const user = new User({
      id: null,
      username,
      isOnline: false,
      room: null
    })

    await this.userRepository.save(user)

    const accessKey = this.authentication.generateAccessKey(
      user.id,
      process.env.JWT_SECRET,
      600 // 10 minutes
    )

    return { userId: user.id, accessKey }
  }

  public async deleteUser({ accessKey, userId, roomId }: IDeleteUserInputDTO) {
    this.assertArgumentNotNull(userId, new UserError('ERR_USER_NOT_FOUND'))
    this.assertArgumentNotNull(roomId, new RoomError('ERR_ROOM_NOT_FOUND'))
    this.authentication.authenticate({ userId, accessKey })
    await this.userNotExistsValidation.validate(userId)
    await this.roomNotExistsValidation.validate(roomId)
    DomainEventPublisher.instance().addSubscriber(this.onUserDeletedSubscriber)
    await this.userRepository.delete(userId)
    DomainEventPublisher.instance().publish(
      new UserDeletedEvent(userId, roomId)
    )
    DomainEventPublisher.instance().removeAllSubscribers()
  }

  public async userInfo({
    userId,
    accessKey
  }: IAuthenticationInputDTO): Promise<IUserInfoOutputDTO> {
    this.assertArgumentNotNull(userId, new UserError('ERR_USER_NOT_FOUND'))
    this.authentication.authenticate({ userId, accessKey })
    await this.userNotExistsValidation.validate(userId)
    const user = await this.userRepository.getUserById(userId)

    const userInfo = {
      userId: user.id,
      username: user.username,
      isOnline: user.isOnline,
      room: user.room
    }
    return userInfo
  }
}

export default UserApplicationService
