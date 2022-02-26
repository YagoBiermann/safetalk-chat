import IValidator from '../Validator'

interface IValidatorComposite extends IValidator {
  add(validator: IValidator): void
}

export default IValidatorComposite
