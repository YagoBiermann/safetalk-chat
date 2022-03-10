import IValidation from '../Validation'

interface IValidatorComposite extends IValidation {
  add(validator: IValidation): void
}

export default IValidatorComposite
