import ISingleTransaction from '../../../src/domain/models/common/SingleTransaction'
import Room from '../../../src/domain/models/room/Room'
import User from '../../../src/domain/models/user/User'

class SingleTransactionMock implements ISingleTransaction {
  constructor() {}

  public async saveAll(user: User, room: Room): Promise<void> {
    Promise.resolve()
  }
}

export default SingleTransactionMock