import AppError from '../ports/AppError'
import { IRoomErrorMessages } from '../ports/RoomError'

class RoomError extends AppError {
  constructor(error: IRoomErrorMessages) {
    super(error)
    this.name = this.constructor.name
  }
}

export default RoomError
