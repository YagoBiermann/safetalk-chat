import { model, Schema } from 'mongoose'
import IRoomRepositoryModel from '../../../domain/models/room/RoomRepository'

const roomSchema = new Schema<IRoomRepositoryModel>({
  _id: { unique: true },
  roomCode: { type: String, required: true },
  messages: [{ type: String, ref: 'Message', required: true, default: [] }],
  users: [{ type: String, ref: 'User', required: true, default: [] }]
})
roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 72 })

const Room = model<IRoomRepositoryModel>('Room', roomSchema)

export { Room }
