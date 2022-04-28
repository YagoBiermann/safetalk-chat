import GetUsersFromRoomDomainService from '../../domain/models/services/GetUsersFromRoom'
import DeleteRoomIfEmptyWhenUserDeletedEventSubscriber from '../subscribers/userDeleted/DeleteRoomIfEmptyWhenUserDeletedEventSubscriber'
import RoomRepositoryFactory from '../../infrastructure/database/repositories/factories/RoomRepository'
import UserRepositoryFactory from '../../infrastructure/database/repositories/factories/UserRepository'
import SingleTransaction from '../../infrastructure/database/repositories/SingleTransaction'
import AuthenticationFactory from '../../infrastructure/jwt/AuthenticationFactory'
import AWSManager from '../../infrastructure/aws/AWSManager'
import IApplicationService from '../ports/services/ApplicationService'
import CreateRoomApplicationService from './CreateRoomApplicationService'
import ValidationFactory, {
  Validations
} from '../validations/ValidationFactory'
import ChangeUserStatusWhenJoinedRoomEventSubscriber from '../subscribers/userJoinedRoom/ChangeStatusWhenUserJoinedRoomEventSubscriber'
import CreateUserApplicationService from './CreateUserApplicationService'
import DeleteUserApplicationService from './DeleteUserApplicationService'
import GetAllUsersFromRoomApplicationService from './GetAllUsersFromRoomApplicationService'
import GenerateRoomCodeApplicationService from './GenerateRoomCodeApplicationService'
import JoinRoomApplicationService from './JoinRoomApplicationService'
import SaveMessageApplicationService from './SaveMessageApplicationService'
import UserInfoApplicationService from './UserInfoApplicationService'

export enum ApplicationServices {
  CreateRoomApplicationService = 'CreateRoomApplicationService',
  CreateUserApplicationService = 'CreateUserApplicationService',
  DeleteUserApplicationService = 'DeleteUserApplicationService',
  GetAllUsersFromRoomApplicationService = 'GetAllUsersFromRoomApplicationService',
  GenerateRoomCodeApplicationService = 'GenerateRoomCodeApplicationService',
  JoinRoomApplicationService = 'JoinRoomApplicationService',
  SaveMessageApplicationService = 'SaveMessageApplicationService',
  UserInfoApplicationService = 'UserInfoApplicationService'
}

class ApplicationServiceFactory {
  private static applicationServices = {
    [ApplicationServices.CreateRoomApplicationService]:
      new CreateRoomApplicationService(
        this.authentication(),
        this.cloudService(),
        ValidationFactory.make(Validations.RoomAlreadyExistsValidation),
        ValidationFactory.make(Validations.UserAlreadyInRoomValidation),
        new ChangeUserStatusWhenJoinedRoomEventSubscriber(
          this.userRepository(),
          this.singleTransaction()
        )
      ),
    [ApplicationServices.CreateUserApplicationService]:
      new CreateUserApplicationService(
        this.userRepository(),
        this.authentication(),
        ValidationFactory.make(Validations.UsernameTakenValidation)
      ),
    [ApplicationServices.DeleteUserApplicationService]:
      new DeleteUserApplicationService(
        this.userRepository(),
        this.authentication(),
        ValidationFactory.make(Validations.RoomNotExistsValidation),
        new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(
          this.roomRepository(),
          this.cloudService()
        )
      ),
    [ApplicationServices.GetAllUsersFromRoomApplicationService]:
      new GetAllUsersFromRoomApplicationService(
        this.authentication(),
        ValidationFactory.make(Validations.RoomNotExistsValidation),
        this.roomRepository(),
        new GetUsersFromRoomDomainService(
          this.roomRepository(),
          this.userRepository()
        )
      ),
    [ApplicationServices.GenerateRoomCodeApplicationService]:
      new GenerateRoomCodeApplicationService(this.authentication()),
    [ApplicationServices.JoinRoomApplicationService]:
      new JoinRoomApplicationService(
        this.roomRepository(),
        this.authentication(),
        this.cloudService(),
        ValidationFactory.make(Validations.RoomNotExistsValidation),
        ValidationFactory.make(Validations.UserAlreadyInRoomValidation),
        new ChangeUserStatusWhenJoinedRoomEventSubscriber(
          this.userRepository(),
          this.singleTransaction()
        )
      ),
    [ApplicationServices.SaveMessageApplicationService]:
      new SaveMessageApplicationService(
        this.userRepository(),
        this.roomRepository(),
        this.authentication()
      ),
    [ApplicationServices.UserInfoApplicationService]:
      new UserInfoApplicationService(
        this.userRepository(),
        this.roomRepository(),
        this.authentication(),
        ValidationFactory.make(Validations.UserNotExistsValidation)
      )
  }
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

  private static cloudService() {
    return new AWSManager()
  }

  public static make(
    applicationService: ApplicationServices
  ): IApplicationService {
    try {
      return this.applicationServices[applicationService]
    } catch (error) {
      throw new Error(`application service ${applicationService} not found`)
    }
  }
}

export default ApplicationServiceFactory
