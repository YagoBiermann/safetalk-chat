import { Response } from 'express'

interface IErrorPresenter {
  forbidden(error: Error): Response
  notFound(error: Error): Response
  internalServerError(error: Error): Response
  badRequest(error: Error): Response
  unauthorized(error: Error): Response
  notAcceptable(error: Error): Response
}

export default IErrorPresenter
