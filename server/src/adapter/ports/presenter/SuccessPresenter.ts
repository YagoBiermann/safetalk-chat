import { Response } from 'express'

interface ISuccessPresenter {
  success<Data = any>(data: Data): Response
  created<Data = any>(data: Data): Response
  noContent(): Response
}

export default ISuccessPresenter
