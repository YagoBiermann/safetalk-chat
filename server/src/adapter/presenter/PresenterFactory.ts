import { Response } from 'express'
import ErrorHandler from './ErrorHandler'
import ErrorPresenter from './ErrorPresenter'
import SuccessPresenter from './SuccessPresenter'

class PresenterFactory {
  private constructor() {}
  public static make(res: Response) {
    const successPresenter = new SuccessPresenter(res)
    const errorPresenter = new ErrorPresenter(res)
    const errorHandler = new ErrorHandler(errorPresenter)

    return {
      successPresenter,
      errorHandler
    }
  }
}

export default PresenterFactory
