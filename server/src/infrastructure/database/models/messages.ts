import { Schema } from 'mongoose'
import { IMessageRepositoryModel } from '../../../domain/models/room/RoomRepository'
import MESSAGE_TYPE from '../../../domain/models/room/message/MessageType'
import { IFileMetaData } from '../../../domain/models/room/message/MessageDTO'

const fileSchema = new Schema<IFileMetaData>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true }
})

const messageSchema = new Schema<IMessageRepositoryModel>({
  _id: { type: String },
  roomCode: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  messageType: {
    type: String,
    enum: [
      MESSAGE_TYPE.AUDIO,
      MESSAGE_TYPE.FILE,
      MESSAGE_TYPE.IMAGE,
      MESSAGE_TYPE.TEXT,
      MESSAGE_TYPE.VIDEO
    ],
    required: true
  },
  file: { type: fileSchema, required: false },
  createdAt: { type: Number, required: true, default: Date.now }
})

export { messageSchema }
