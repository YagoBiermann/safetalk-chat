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
    if (!this._session) {
      this._session = await this._mongoose.startSession()
    }
    return this._session
  }

  public startTransaction() {
    this._session.startTransaction()
  }

  public async commitTransaction() {
    await this._session.commitTransaction()
    await this._session.endSession()
    this._session = null
  }

  public async abortTransaction() {
    await this._session.abortTransaction()
    await this._session.endSession()
    this._session = null
  }

  public async connect(URI: string): Promise<void> {
    await this._mongoose.connect(URI, {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      w: 'majority'
    })
    this._mongoose.connection.on('error', () => {
      process.exit(1)
    })
  }

  public async disconnect(): Promise<void> {
    await this._mongoose.disconnect()
  }
}

export { Database }
