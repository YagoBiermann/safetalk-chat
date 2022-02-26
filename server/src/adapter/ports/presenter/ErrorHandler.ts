export default interface IErrorHandler {
  handle(error: Error): HttpResponseDTO<IErrorMessage>
}
