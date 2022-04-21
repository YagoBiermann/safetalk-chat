import IValidation from '../ports/validations/Validation'
import UserNotExistsValidation from './UserNotExistsValidation'
import UsernameTakenValidation from './UsernameTakenValidation'
import UserAlreadyInRoomValidation from './UserAlreadyInRoomValidation'
import RoomAlreadyExistsValidation from './RoomAlreadyExistsValidation'
import RoomNotExistsValidation from './RoomNotExistsValidation'
import RoomEmptyValidation from './RoomEmptyValidation'
import AccessKeyValidation from './AccessKeyValidation'
import UserRepositoryFactory from '../../infrastructure/database/repositories/factories/UserRepository'
import RoomRepositoryFactory from '../../infrastructure/database/repositories/factories/RoomRepository'

export enum Validations {
  UserNotExistsValidation = 'UserNotExistsValidation',
  UsernameTakenValidation = 'UsernameTakenValidation',
  UserAlreadyInRoomValidation = 'UserAlreadyInRoomValidation',
  RoomNotExistsValidation = 'RoomNotExistsValidation',
  RoomEmptyValidation = 'RoomEmptyValidation',
  RoomAlreadyExistsValidation = 'RoomAlreadyExistsValidation',
  AccessKeyValidation = 'AccessKeyValidation'
}

class ValidationFactory {
  private validations = {
    [Validations.UserNotExistsValidation]: new UserNotExistsValidation(
      this.userRepository()
    ),
    [Validations.UsernameTakenValidation]: new UsernameTakenValidation(
      this.userRepository()
    ),
    [Validations.UserAlreadyInRoomValidation]: new UserAlreadyInRoomValidation(
      this.userRepository()
    ),
    [Validations.RoomNotExistsValidation]: new RoomNotExistsValidation(
      this.roomRepository()
    ),
    [Validations.RoomEmptyValidation]: new RoomEmptyValidation(
      this.roomRepository(),
      this.userRepository()
    ),
    [Validations.RoomAlreadyExistsValidation]: new RoomAlreadyExistsValidation(
      this.roomRepository()
    ),
    [Validations.AccessKeyValidation]: new AccessKeyValidation()
  }
  private constructor() {}

  private roomRepository() {
    return RoomRepositoryFactory.make()
  }

  private userRepository() {
    return UserRepositoryFactory.make()
  }

  public static make(aValidation: Validations): IValidation {
    const notInValidationEnum =
      Object.values(Validations).indexOf(aValidation) === -1

    if (notInValidationEnum) {
      throw new Error(`Validation ${aValidation} not found`)
    }
    const validation = new ValidationFactory().validations[aValidation]
    return validation
  }
}

export default ValidationFactory
