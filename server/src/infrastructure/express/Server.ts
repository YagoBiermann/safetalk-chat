import express, { Application } from 'express'
import { createServer, Server } from 'http'
class AppServer {
  private _express: Application = express()
  private _server: Server = createServer(this._express)
  public port: number | string = process.env.SERVER_PORT || 5000
  constructor() {}

  public setConfig(key: string, value: any) {
    this._express.set(key, value)
  }

  public get app(): Application {
    return this._express
  }

  public get server(): Server {
    return this._server
  }

  public run(router: express.Router) {
    this.setConfig('trust proxy', 'loopback, 192.168.0.102')
    this.app.use('/api/v2', router)
    this._server.listen(this.port)
  }
}

export default AppServer
