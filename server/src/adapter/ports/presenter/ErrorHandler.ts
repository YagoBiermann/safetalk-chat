import { Response } from 'express'

export default interface IErrorHandler {
  handle(error: Error): Response
}
