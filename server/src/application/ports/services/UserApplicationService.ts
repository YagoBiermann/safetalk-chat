import { IAuthenticationInputDTO } from './AuthenticationService'

interface ICreateUserInputDTO {
  username: string
  userId: string
}

interface ICreateUserOutputDTO {
  accessKey: string
  userId: string
}

interface IUserInfoOutputDTO {
  userId: string
  username: string
  isOnline: boolean
  roomCode: string | null
  room: string | null
}

interface IDeleteUserInputDTO {
  userId: string
  roomId: string
  accessKey: string
}

interface IDeleteUserOutputDTO {
  roomCode: string
}

interface IUserApplicationService {
  createUser(data: ICreateUserInputDTO): Promise<ICreateUserOutputDTO>
  userInfo(data: IAuthenticationInputDTO): Promise<IUserInfoOutputDTO>
  deleteUser(data: IDeleteUserInputDTO): Promise<IDeleteUserOutputDTO>
}

export {
  ICreateUserOutputDTO,
  ICreateUserInputDTO,
  IUserApplicationService,
  IUserInfoOutputDTO,
  IDeleteUserInputDTO,
  IDeleteUserOutputDTO
}
