import ValueObject from '../../common/ValueObject'

class FileMessage extends ValueObject {
  constructor(
    private readonly _fileUrl: string,
    private readonly _fileName: string,
    private readonly _fileType: string,
    private readonly _fileSize: number
  ) {
    super()
  }

  get url(): string {
    return this._fileUrl
  }

  get name(): string {
    return this._fileName
  }

  get type(): string {
    return this._fileType
  }

  get size(): number {
    return this._fileSize
  }
}

export default FileMessage
