import AppError from '../../../domain/errors/ports/AppError'

interface IValidation<
  Input = unknown,
  Output = Promise<AppError> | null
> {
  validate(input: Input): Output
}

export default IValidation
