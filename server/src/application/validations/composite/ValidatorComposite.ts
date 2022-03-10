import AppError from '../../../domain/errors/models/AppError'
import IValidatorComposite from '../../ports/validations/composite/ValidationComposite'
import IValidation from '../../ports/validations/Validation'

class ValidatorComposite implements IValidatorComposite {
  protected composedValidation: IValidation[] = []

  public async validate(input: any): Promise<AppError> | null {
    for (const validator of this.composedValidation) {
      const error = validator.validate(input)
      if (error) {
        return error
      }
    }
    return null
  }

  public add(...validators: IValidation[]) {
    validators.forEach(validation => {
      this.composedValidation.push(validation)
    })
  }
}

export default ValidatorComposite
