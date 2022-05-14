import { Application, RequestHandler } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
declare module 'express-session' {
  interface SessionData {
    user: string
    accessKey: string
    room: string
    roomCode: string
  }
}

class AppSession {
  private _session: RequestHandler
  private app: Application
  constructor(app: Application, config: session.SessionOptions) {
    this._session = session(config)

    this.app = app
  }

  public exec() {
    this.app.use(this.session)
  }

  public async disconnect() {
    await MongoStore.prototype.close()
  }

  public get session(): RequestHandler {
    return this._session
  }
}

export default AppSession
