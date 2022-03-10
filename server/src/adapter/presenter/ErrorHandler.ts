import { Response } from 'express'
import AppError from '../../domain/errors/ports/AppError'
import IErrorHandler from '../ports/presenter/ErrorHandler'
import IErrorPresenter from '../ports/presenter/ErrorPresenter'

class ErrorHandler implements IErrorHandler {
  constructor(private errorPresenter: IErrorPresenter) {}

  public handle(error: AppError): Response {
    switch (error.code) {
      case 10:
        return this.errorPresenter.badRequest(error)
      case 20:
        return this.errorPresenter.unauthorized(error)
      case 30:
        return this.errorPresenter.forbidden(error)
      case 40:
        return this.errorPresenter.notFound(error)
      case 50:
        return this.errorPresenter.notAcceptable(error)

      default:
        return this.errorPresenter.internalServerError(error)
    }
  }
}

export default ErrorHandler
