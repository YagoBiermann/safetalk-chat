import { Schema } from 'mongoose'
import { IMessageRepositoryModel } from '../../../domain/models/room/RoomRepository'
import MessageType from '../../../domain/models/room/message/MessageType'

const messageSchema = new Schema<IMessageRepositoryModel>({
  _id: { type: String },
  roomCode: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  messageType: {
    type: String,
    enum: [
      MessageType.AUDIO,
      MessageType.FILE,
      MessageType.IMAGE,
      MessageType.TEXT,
      MessageType.VIDEO
    ],
    required: true
  },
  fileURL: { type: String, required: false },
  createdAt: { type: Number, required: true, default: Date.now }
})

export { messageSchema }
