import MessageError from '../../errors/models/MessageError'

class TextMessage {
  private readonly _text: string
  constructor(text: string) {
    TextMessage._validate(this._text)
    this._text = text
  }

  get text() {
    return this._text
  }

  private static _validate(text: string) {
    if (text.length > 400) {
      throw new MessageError('ERR_MESSAGE_MAX_LENGTH')
    }

    if (text.length < 1) {
      throw new MessageError('ERR_MESSAGE_MIN_LENGTH')
    }

    return null
  }
}

export default TextMessage
