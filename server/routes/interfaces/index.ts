interface IUsername {
  username: string
}

interface IRoomCode {
  roomCode: string
}

interface ISocketID {
  socketID: string
}

type IRoomBody = IUsername & IRoomCode & ISocketID

export { IUsername, IRoomCode, ISocketID, IRoomBody }
