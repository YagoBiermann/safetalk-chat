import GetUsersFromRoomDomainService from '../../domain/models/services/GetUsersFromRoom'
import OnUserJoinedRoomSubscriber from '../../domain/models/services/subscribers/OnUserJoinedRoom'
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

    const singleTransaction = new SingleTransaction(
      this.roomRepository(),
      this.userRepository()
    )
    const subscriber = new OnUserJoinedRoomSubscriber(
      this.userRepository(),
      singleTransaction
    )

    const getUsersFromRoomDomainService = new GetUsersFromRoomDomainService(
      this.roomRepository(),
      this.userRepository()
    )

    return new RoomApplicationService(
      this.authentication(),
      roomAlreadyExistsValidation,
      roomNotExistsValidation,
      userAlreadyInRoomValidation,
      this.roomRepository(),
      getUsersFromRoomDomainService,
      subscriber
    )
  }
  public static makeUserApplicationService(): IUserApplicationService {
    const usernameTakenValidation = new UsernameTakenValidation(
      this.userRepository()
    )
    const userNotExistsValidation = new UserNotExistsValidation(
      this.userRepository()
    )

    return new UserApplicationService(
      this.userRepository(),
      this.authentication(),
      usernameTakenValidation,
      userNotExistsValidation
    )
  }
}

export default ApplicationServiceFactory
