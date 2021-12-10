import { UserRepository } from './repositories/UserRepository'
import { RoomRepository } from './repositories/RoomRepository'

const userRepository = new UserRepository()
const roomRepository = new RoomRepository()

export { userRepository, roomRepository }
