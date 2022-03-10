import { Response } from 'express'
import IErrorPresenter from '../ports/presenter/ErrorPresenter'

class ErrorPresenter implements IErrorPresenter {
  constructor(private res: Response) {}
  public forbidden(error: Error) {
    return this.res.status(403).json({
      message: error.message
    })
  }

  public notFound(error: Error) {
    return this.res.status(404).json({
      message: error.message
    })
  }

  public internalServerError(error: Error) {
    return this.res.status(500).json({
      message: error.message
    })
  }

  public badRequest(error: Error) {
    return this.res.status(400).json({ message: error.message })
  }
  public unauthorized(error: Error) {
    return this.res.status(401).json({
      message: error.message
    })
  }

  public notAcceptable(error: Error) {
    return this.res.status(406).json({
      message: error.message
    })
  }
}

export default ErrorPresenter
