import Room from '../room/Room'
import User from '../user/User'

interface ISingleTransaction {
  saveAll(user: User, room: Room): Promise<void>
}

export default ISingleTransaction
