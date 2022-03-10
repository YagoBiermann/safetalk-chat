import { Response } from 'express'
import ISuccessPresenter from '../ports/presenter/SuccessPresenter'

class SuccessPresenter implements ISuccessPresenter {
  constructor(private res: Response) {}
  public success(data: any): Response {
    return this.res.status(200).json(data)
  }

  public created(data: any): Response {
    return this.res.status(201).json(data)
  }

  public noContent(): Response {
    return this.res.status(204).json({})
  }
}

export default SuccessPresenter
