interface IUsername {
  username: string
}

interface IRoomCode {
  roomCode: string
}

type IFileUpload = IRoomCode & { file: string }
type IMediaStream = IRoomCode & { media: string }

type IRoomBody = IUsername & IRoomCode

export { IUsername, IRoomCode, IRoomBody, IFileUpload, IMediaStream }
