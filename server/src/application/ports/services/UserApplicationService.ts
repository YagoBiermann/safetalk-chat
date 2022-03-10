interface ICreateUserInputDTO {
  username: string
  userId: string
}

interface ICreateUserOutputDTO {
  accessKey: string
  userId: string
}

interface IUserApplicationService {
  createUser(data: ICreateUserInputDTO): Promise<ICreateUserOutputDTO>
}

export { ICreateUserOutputDTO, ICreateUserInputDTO, IUserApplicationService }
