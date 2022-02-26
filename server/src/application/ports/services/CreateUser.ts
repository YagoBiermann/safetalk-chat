export interface ICreateUserAppService {
  exec(username: string, userId: string): Promise<ICreateUserOutputDTO>
}

export interface ICreateUserOutputDTO {
  accessKey: string
  userId: string
}
