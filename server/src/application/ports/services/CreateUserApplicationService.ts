interface ICreateUserInputDTO {
  username: string
  userId: string
}

interface ICreateUserOutputDTO {
  accessKey: string
  userId: string
}

export { ICreateUserInputDTO, ICreateUserOutputDTO }
