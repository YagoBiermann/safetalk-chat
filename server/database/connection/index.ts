import mongoose, { Mongoose } from 'mongoose'

class Database {
  private mongoose: Mongoose
  private URI: string

  constructor() {
    this.mongoose = mongoose
    this.URI = process.env.MONGO_URI
  }

  public async connect(): Promise<void> {
    await this.mongoose.connect(this.URI)
  }
}

export { Database }
