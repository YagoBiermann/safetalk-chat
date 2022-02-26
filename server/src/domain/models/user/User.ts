import IUserDTO from './UserDTO'
import Identifier from '../../shared/valueObjects/Identifier'
import Username from '../../shared/valueObjects/Username'

class User {
  private _id: Identifier
  private _username: Username
  private _isOnline: boolean
  private _room: string | undefined

  public constructor(user: IUserDTO) {
    this._id = new Identifier(user.id)
    this._username = new Username(user.username)
    this._isOnline = user.isOnline
    user.room ? this.joinRoom(user.room) : undefined
  }

  public get id(): string {
    return this._id.value
  }

  public get username(): string {
    return this._username.value
  }

  public get isOnline(): boolean {
    return this._isOnline
  }

  public get room(): string | null {
    return this._room || null
  }

  public joinRoom(roomId: string) {
    this._room = roomId
  }

  public disconnect() {
    this._isOnline = false
  }

  public connect() {
    this._isOnline = true
  }
}

export default User
