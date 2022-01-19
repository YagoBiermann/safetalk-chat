import { model, Schema } from 'mongoose'

interface IRoom {
  _id: Schema.Types.ObjectId
  roomCode: string
}

const roomSchema = new Schema<IRoom>({
  roomCode: { type: String, required: true }
})
roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 72 })

const Room = model<IRoom>('Room', roomSchema)

export { Room, IRoom }
