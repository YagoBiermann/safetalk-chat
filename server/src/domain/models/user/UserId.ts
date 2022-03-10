import Identifier from '../common/valueObjects/Identifier'

class UserId extends Identifier {
  constructor(id?: string) {
    super(id)
  }
}

export default UserId
