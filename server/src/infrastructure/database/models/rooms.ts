import { model, Schema } from 'mongoose'
import { IRoomRepositoryModel } from '../../../domain/models/room/RoomRepository'
import { messageSchema } from './messages'

const roomSchema = new Schema<IRoomRepositoryModel>({
  _id: { type: String },
  roomCode: { type: String, required: true, unique: true },
  messages: [{ type: messageSchema, required: true, default: [] }],
  users: [{ type: String, ref: 'User', required: true, default: [] }]
})
roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 72 })

const Room = model<IRoomRepositoryModel>('Room', roomSchema)

export { Room }
