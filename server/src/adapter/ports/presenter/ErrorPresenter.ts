interface IErrorMessage {
  message: string
}

interface IErrorPresenter {
  forbidden(error: Error): HttpResponseDTO<IErrorMessage>
  notFound(error: Error): HttpResponseDTO<IErrorMessage>
  internalServerError(error: Error): HttpResponseDTO<IErrorMessage>
  badRequest(error: Error): HttpResponseDTO<IErrorMessage>
  unauthorized(error: Error): HttpResponseDTO<IErrorMessage>
  notAcceptable(error: Error): HttpResponseDTO<IErrorMessage>
}
