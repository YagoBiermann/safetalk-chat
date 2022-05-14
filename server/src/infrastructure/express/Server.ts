import express, { Application } from 'express'
import { createServer, Server } from 'http'
class AppServer {
  private _express: Application = express()
  private _server: Server = createServer(this._express)
  private _port: number | string
  constructor(port: number | string) {
    this._port = port || process.env.SERVER_PORT || 5000
  }

  public setConfig(key: string, value: any) {
    this._express.set(key, value)
  }

  public get app(): Application {
    return this._express
  }

  public get server(): Server {
    return this._server
  }

  public get port(): number | string {
    return this._port
  }

  public set port(port: number | string) {
    this._port = port
  }

  public close() {
    this._server.close()
  }

  public run(router: express.Router) {
    this.setConfig('trust proxy', 'loopback, 192.168.0.102')
    this.app.use('/api/v2', router)
    this._server.listen(this._port)
  }
}

export default AppServer
