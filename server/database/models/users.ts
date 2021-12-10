import { model, Schema } from 'mongoose'

interface IUser {
  socketID: string
  username: string
  room: Schema.Types.ObjectId
  isAdmin: boolean
}

const userSchema = new Schema<IUser>({
  socketID: { type: String, required: true },
  username: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: false },
  isAdmin: { type: Boolean, required: true }
})
const User = model<IUser>('User', userSchema)

export { User, IUser }
