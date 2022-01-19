import { RepositoryFactory } from '../../database/index'
import { RoomRepository } from '../../database/repositories/RoomRepository'
import { UserRepository } from '../../database/repositories/UserRepository'
import { BodyValidator } from './request/BodyValidator'
import { FileValidator } from './request/FileValidator'
import { HeaderValidator } from './request/HeaderValidator'
import { RoomCodeValidator } from './request/RoomCodeValidator'
import { UsernameValidator } from './request/UsernameValidator'
import { RoomValidator } from './room/RoomValidator'
import { UserValidator } from './user/UserValidator'
import {
  IBodyValidator,
  IRoomCodeValidator,
  IUsernameValidator,
  IValidatorFactory
} from './interfaces'

class ValidatorFactory implements IValidatorFactory {
  private roomRepository: RoomRepository
  private userRepository: UserRepository

  constructor() {
    this.roomRepository = new RepositoryFactory().createRoomRepository()
    this.userRepository = new RepositoryFactory().createUserRepository()
  }

  public createRoomValidator(): RoomValidator {
    return new RoomValidator(this.roomRepository, this.userRepository)
  }

  public createUserValidator(): UserValidator {
    return new UserValidator(this.userRepository)
  }

  public createFileValidator(): FileValidator {
    return new FileValidator()
  }

  public createHeaderValidator(): HeaderValidator {
    return new HeaderValidator()
  }

  public createBodyValidator(): IBodyValidator {
    return new BodyValidator()
  }

  public createRoomCodeValidator(): IRoomCodeValidator {
    return new RoomCodeValidator()
  }

  public createUsernameValidator(): IUsernameValidator {
    return new UsernameValidator()
  }
}

export { ValidatorFactory }
