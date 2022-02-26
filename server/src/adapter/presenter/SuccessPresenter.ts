class SuccessPresenter implements ISuccessPresenter {
  public success(data: any): HttpResponseDTO<any> {
    return {
      status: 200,
      body: data
    }
  }

  public created(data: any): HttpResponseDTO<any> {
    return {
      status: 201,
      body: data
    }
  }

  public noContent(): HttpResponseDTO {
    return {
      status: 204,
      body: {}
    }
  }
}

export default SuccessPresenter
