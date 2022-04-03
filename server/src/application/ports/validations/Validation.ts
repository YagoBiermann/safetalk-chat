import AppError from '../../../domain/errors/ports/AppError'

interface IValidation<
  Input = any,
  Output = Promise<AppError> | AppError | null
> {
  validate(input: Input): Output
}

export default IValidation
