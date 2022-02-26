import AppError from '../../../domain/errors/ports/AppError'

interface IValidator<
  Input = unknown,
  Output = Promise<AppError> | null
> {
  validate(input: Input): Output
}

export default IValidator
