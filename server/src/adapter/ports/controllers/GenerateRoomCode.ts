import IController from './Controller'

interface IGenerateRoomCodeController
  extends IController<
    { userId: string; accessKey: string },
    Promise<
      | HttpResponseDTO<IGenerateRoomCodeOutputDTO>
      | HttpResponseDTO<IErrorMessage>
    >
  > {}

export default IGenerateRoomCodeController
