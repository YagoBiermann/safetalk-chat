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
  room: string
}

interface IDeleteUserInputDTO {
  userId: string
  roomId: string
  accessKey: string
}

interface IUserApplicationService {
  createUser(data: ICreateUserInputDTO): Promise<ICreateUserOutputDTO>
  userInfo(data: IAuthenticationInputDTO): Promise<IUserInfoOutputDTO>
  deleteUser(data: IDeleteUserInputDTO): Promise<void>
}

export {
  ICreateUserOutputDTO,
  ICreateUserInputDTO,
  IUserApplicationService,
  IUserInfoOutputDTO,
  IDeleteUserInputDTO
}
