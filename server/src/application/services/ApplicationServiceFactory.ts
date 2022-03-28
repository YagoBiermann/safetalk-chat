import GetUsersFromRoomDomainService from '../../domain/models/services/GetUsersFromRoom'
import DeleteRoomIfEmptyWhenUserDeletedEventSubscriber from '../subscribers/userDeleted/DeleteRoomIfEmptyWhenUserDeletedEventSubscriber'
import ChangeStatusWhenUserJoinedRoomEventSubscriber from '../subscribers/userJoinedRoom/ChangeStatusWhenUserJoinedRoomEventSubscriber'
import RoomRepositoryFactory from '../../infrastructure/database/repositories/factories/RoomRepository'
import UserRepositoryFactory from '../../infrastructure/database/repositories/factories/UserRepository'
import SingleTransaction from '../../infrastructure/database/repositories/SingleTransaction'
import AuthenticationFactory from '../../infrastructure/jwt/AuthenticationFactory'
import { IRoomApplicationService } from '../ports/services/RoomApplicationService'
import { IUserApplicationService } from '../ports/services/UserApplicationService'
import RoomAlreadyExistsValidation from '../validations/leaf/RoomAlreadyExistsValidation'
import RoomNotExistsValidation from '../validations/leaf/RoomNotExistsValidation'
import UserAlreadyInRoomValidation from '../validations/leaf/UserAlreadyInRoomValidation'
import UsernameTakenValidation from '../validations/leaf/UsernameTakenValidation'
import UserNotExistsValidation from '../validations/leaf/UserNotExistsValidation'
import RoomApplicationService from './RoomApplicationService'
import UserApplicationService from './UserApplicationService'
import AWSManager from '../../infrastructure/aws/AWSManager'

class ApplicationServiceFactory {
  private constructor() {}

  private static userRepository() {
    return UserRepositoryFactory.make()
  }

  private static roomRepository() {
    return RoomRepositoryFactory.make()
  }

  private static authentication() {
    return AuthenticationFactory.make()
  }

  private static singleTransaction() {
    return new SingleTransaction(this.roomRepository(), this.userRepository())
  }

  public static makeRoomApplicationService(): IRoomApplicationService {
    const roomAlreadyExistsValidation = new RoomAlreadyExistsValidation(
      this.roomRepository()
    )

    const roomNotExistsValidation = new RoomNotExistsValidation(
      this.roomRepository()
    )

    const userAlreadyInRoomValidation = new UserAlreadyInRoomValidation(
      this.userRepository()
    )

    const changeStatusWhenUserJoinedRoomSubscriber =
      new ChangeStatusWhenUserJoinedRoomEventSubscriber(
        this.userRepository(),
        this.singleTransaction()
      )

    const getUsersFromRoomDomainService = new GetUsersFromRoomDomainService(
      this.roomRepository(),
      this.userRepository()
    )

    const cloudService = new AWSManager()

    return new RoomApplicationService(
      this.authentication(),
      cloudService,
      roomAlreadyExistsValidation,
      roomNotExistsValidation,
      userAlreadyInRoomValidation,
      this.roomRepository(),
      this.userRepository(),
      getUsersFromRoomDomainService,
      changeStatusWhenUserJoinedRoomSubscriber
    )
  }
  public static makeUserApplicationService(): IUserApplicationService {
    const usernameTakenValidation = new UsernameTakenValidation(
      this.userRepository()
    )
    const userNotExistsValidation = new UserNotExistsValidation(
      this.userRepository()
    )

    const roomNotExistsValidation = new RoomNotExistsValidation(
      this.roomRepository()
    )

    const deleteRoomIfEmptyWhenUserDeletedSubscriber =
      new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(this.roomRepository())

    return new UserApplicationService(
      this.userRepository(),
      this.roomRepository(),
      this.authentication(),
      usernameTakenValidation,
      userNotExistsValidation,
      roomNotExistsValidation,
      deleteRoomIfEmptyWhenUserDeletedSubscriber
    )
  }
}

export default ApplicationServiceFactory
