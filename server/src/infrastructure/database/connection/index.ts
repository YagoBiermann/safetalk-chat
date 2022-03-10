import mongoose, { Mongoose } from 'mongoose'

class Database {
  private _mongoose: Mongoose = mongoose
  private _session: mongoose.ClientSession
  private static _instance: Database

  private constructor() {}

  public static instance(): Database {
    if (!this._instance) {
      this._instance = new Database()
    }
    return this._instance
  }

  public async session() {
    this._session = await this._mongoose.startSession()
    return this._session
  }

  public async connect(URI: string): Promise<void> {
    await this._mongoose.connect(URI, {
      readConcern: { level: 'majority' }
    })
    this._mongoose.connection.on('error', () => {
      process.exit(1)
    })
  }
}

export { Database }
