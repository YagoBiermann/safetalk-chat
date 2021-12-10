import { model, Schema } from 'mongoose'

interface IRoom {
  id: Schema.Types.ObjectId
  roomCode: string
}

const roomSchema = new Schema<IRoom>({
  roomCode: { type: String, required: true }
})

const Room = model<IRoom>('Room', roomSchema)

export { Room, IRoom }
