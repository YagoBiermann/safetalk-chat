import AppError from '../ports/AppError'
import { IMessageErrorMessages } from '../ports/MessageError'

class MessageError extends AppError {
  constructor(error: IMessageErrorMessages) {
    super(error)
    this.name = this.constructor.name
  }
}

export default MessageError
