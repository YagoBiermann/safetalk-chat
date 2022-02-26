export default interface IController<I = unknown, O = unknown> {
  handle(input: I): O
}
