interface ISuccessPresenter {
  success<Data = any>(data: Data): HttpResponseDTO<Data>
  created<Data = any>(data: Data): HttpResponseDTO<Data>
  noContent(): HttpResponseDTO
}
