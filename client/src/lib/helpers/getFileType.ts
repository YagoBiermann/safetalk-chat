import { MESSAGE_TYPE } from '../enums'

export default function getFileType(file: File): MESSAGE_TYPE {
  const fileType = file.type.split('/')[0]
  let messageType: MESSAGE_TYPE
  switch (fileType) {
    case 'image':
      messageType = MESSAGE_TYPE.IMAGE
      break
    case 'video':
      messageType = MESSAGE_TYPE.VIDEO
      break
    case 'audio':
      messageType = MESSAGE_TYPE.AUDIO
      break
    default:
      messageType = MESSAGE_TYPE.FILE
      break
  }
  return messageType
}
