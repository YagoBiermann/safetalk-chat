import express, { Application } from 'express'
import { createServer, Server } from 'http'
class AppServer {
  private _express: Application = express()
  private _server: Server = createServer(this._express)
  public port: number | string = process.env.SERVER_PORT || 5000
  constructor() {}

  private setupConfig() {
    this._express.set('trust proxy', 'loopback')
  }

  public get app(): Application {
    return this._express
  }

  public get server(): Server {
    return this._server
  }

  public run(router: express.Router) {
    this.setupConfig()
    this.app.use('/api/v2', router)
    this._server.listen(this.port)
  }
}

export default AppServer
