import { model, Schema } from 'mongoose'
import { IUserRepositoryModel } from '../../../domain/models/user/UserRepository'

const userSchema = new Schema<IUserRepositoryModel>({
  _id: { type: String },
  username: { type: String, required: true },
  room: { type: String, ref: 'Room', required: false },
  isOnline: { type: Boolean, required: true }
})

userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 72 })

const User = model<IUserRepositoryModel>('User', userSchema)

export { User }
