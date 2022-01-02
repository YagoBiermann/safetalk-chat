interface IBodyValidator {
  checkTooManyFields(body: Object): void
  checkMissingBody(body: Object): void
}

interface IFileValidator {
  checkFilePath(filePath: string, roomCode: string): void
  checkFileExtension(file: string): void
}

interface IHeaderValidator {
  checkRange(n: string, media: string, roomCode: string): void
  checkContentType(contentType: string): void
}

interface IRoomCodeValidator {
  checkEmptyField(roomCode: string): void
  checkInvalid(roomCode: string): void
  checkMaxLength(roomCode: string): void
}

interface ISocketIDValidator {
  checkMaxLength(socketID: string): void
  checkEmptyField(socketID: string): void
}

interface IUsernameValidator {
  checkEmptyField(username: string): void
  checkMaxLength(username: string): void
  checkInvalid(username: string): void
}

interface IRoomValidator {
  checkIfRoomAlreadyExists(roomCode: string): Promise<void>
  checkIfRoomExists(roomCode: string): Promise<void>
  checkIfRoomIsNotEmpty(roomCode: string): Promise<void>
}

interface IUserValidator {
  checkIfUsernameIsTaken(username: string): Promise<void>
  checkIfUserExists(socketID: string): Promise<void>
}

interface IValidatorFactory {
  createBodyValidator(): IBodyValidator
  createFileValidator(): IFileValidator
  createHeaderValidator(): IHeaderValidator
  createRoomCodeValidator(): IRoomCodeValidator
  createSocketIDValidator(): ISocketIDValidator
  createUsernameValidator(): IUsernameValidator
  createRoomValidator(): IRoomValidator
  createUserValidator(): IUserValidator
}

export {
  IBodyValidator,
  IFileValidator,
  IHeaderValidator,
  IRoomCodeValidator,
  ISocketIDValidator,
  IUsernameValidator,
  IRoomValidator,
  IUserValidator,
  IValidatorFactory
}