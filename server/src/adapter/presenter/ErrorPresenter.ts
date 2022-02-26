class ErrorPresenter implements IErrorPresenter {
  public forbidden(error: Error) {
    return {
      status: 403,
      body: {
        message: error.message
      }
    }
  }

  public notFound(error: Error) {
    return {
      status: 404,
      body: {
        message: error.message
      }
    }
  }

  public internalServerError(error: Error) {
    return {
      status: 500,
      body: {
        message: error.message
      }
    }
  }

  public badRequest(error: Error) {
    return {
      status: 400,
      body: {
        message: error.message
      }
    }
  }
  public unauthorized(error: Error) {
    return {
      status: 401,
      body: {
        message: error.message
      }
    }
  }

  public notAcceptable(error: Error) {
    return {
      status: 406,
      body: {
        message: error.message
      }
    }
  }
}

export default ErrorPresenter
