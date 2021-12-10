import { RoomValidator } from './room/RoomValidator'
import { UserValidator } from './user/UserValidator'
import { RoomRepository } from '../../database/repositories/RoomRepository'
import { UserRepository } from '../../database/repositories/UserRepository'

const roomRepository = new RoomRepository()
const userRepository = new UserRepository()
const roomValidator = new RoomValidator(roomRepository, userRepository)
const userValidator = new UserValidator(userRepository)

export { roomValidator, userValidator }
