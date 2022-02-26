import { model, Schema } from 'mongoose'
import IMessageRepositoryModel from '../../../domain/models/message/MessageRepository'

const messageSchema = new Schema<IMessageRepositoryModel>({
  _id: { unique: true },
  roomCode: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  blob: { type: String, required: false },
  createdAt: { type: Number, required: true, default: Date.now }
})
messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 72 })

const Message = model<IMessageRepositoryModel>('Message', messageSchema)

export { Message }
