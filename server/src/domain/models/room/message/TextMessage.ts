import MessageError from '../../../errors/models/MessageError'
import ValueObject from '../../common/ValueObject'

class TextMessage extends ValueObject {
  private readonly _text: string
  constructor(text: string) {
    super()
    this.validate(text)
    this._text = text
  }

  get content() {
    return this._text
  }

  private validate(text: string) {
    this.assertArgumentStringLength(
      text,
      0,
      400,
      new MessageError('ERR_MESSAGE_LENGTH')
    )

    return null
  }
}

export default TextMessage
