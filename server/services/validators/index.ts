import { RoomValidator } from './room/RoomValidator'
import { UserValidator } from './user/UserValidator'
import { RoomRepository } from '../../database/repositories/RoomRepository'
import { UserRepository } from '../../database/repositories/UserRepository'
import { FileValidator } from './request/FileValidator'
import { HeaderValidator } from './request/HeaderValidator'

const fileValidator = new FileValidator()
const headerValidator = new HeaderValidator()
const roomRepository = new RoomRepository()
const userRepository = new UserRepository()
const roomValidator = new RoomValidator(roomRepository, userRepository)
const userValidator = new UserValidator(userRepository)

export { roomValidator, userValidator, fileValidator, headerValidator }
