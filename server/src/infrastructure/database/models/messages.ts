import { Schema } from 'mongoose'
import { IMessageRepositoryModel } from '../../../domain/models/room/RoomRepository'
import MESSAGE_TYPE from '../../../domain/models/room/message/MessageType'

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
  fileUrl: { type: String, required: false },
  createdAt: { type: Number, required: true, default: Date.now }
})

export { messageSchema }
