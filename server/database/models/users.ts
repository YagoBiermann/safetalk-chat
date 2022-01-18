import { model, Schema } from 'mongoose'

interface IUser {
  _id: Schema.Types.ObjectId
  username: string
  room: Schema.Types.ObjectId
  isAdmin: boolean
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: false },
  isAdmin: { type: Boolean, required: true }
})
userSchema.index({ username: 'text', room: 'text' }, { unique: true })
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 3 })

const User = model<IUser>('User', userSchema)

export { User, IUser }
