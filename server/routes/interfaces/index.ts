interface IUsername {
  username: string
}

interface IRoomCode {
  roomCode: string
}

interface ISocketID {
  socketID: string
}

type IFileUpload = IRoomCode & { file: string }
type IMediaStream = IRoomCode & { media: string }

type IRoomBody = IUsername & IRoomCode & ISocketID

export { IUsername, IRoomCode, ISocketID, IRoomBody, IFileUpload, IMediaStream }
