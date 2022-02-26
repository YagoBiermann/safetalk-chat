import AppError from '../../../domain/errors/models/AppError'
import IValidatorComposite from '../../ports/validations/composite/ValidatorComposite'
import IValidator from '../../ports/validations/Validator'

class ValidatorComposite implements IValidatorComposite {
  protected composedValidation: IValidator[] = []

  public async validate(input: any): Promise<AppError> | null {
    for (const validator of this.composedValidation) {
      const error = validator.validate(input)
      if (error) {
        return error
      }
    }
    return null
  }

  public add(...validators: IValidator[]) {
    validators.forEach(validation => {
      this.composedValidation.push(validation)
    })
  }
}

export default ValidatorComposite
