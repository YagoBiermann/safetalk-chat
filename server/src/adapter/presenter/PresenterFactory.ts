import ErrorHandler from './ErrorHandler'
import ErrorPresenter from './ErrorPresenter'
import SuccessPresenter from './SuccessPresenter'

class PresenterFactory {
  public make() {
    const successPresenter = new SuccessPresenter()
    const errorPresenter = new ErrorPresenter()
    const errorHandler = new ErrorHandler(errorPresenter)

    return {
      successPresenter,
      errorHandler
    }
  }
}

export default PresenterFactory
