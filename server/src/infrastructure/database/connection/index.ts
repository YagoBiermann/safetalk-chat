import mongoose, { Mongoose } from 'mongoose'

class Database {
  private mongoose: Mongoose = mongoose

  constructor(private _URI: string) {}

  public async connect(): Promise<void> {
    await this.mongoose.connect(this._URI)
  }
}

export { Database }
