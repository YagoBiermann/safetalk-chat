interface IApplicationService<Input = any, Output = any> {
  exec(data: Input): Output
}

export default IApplicationService
