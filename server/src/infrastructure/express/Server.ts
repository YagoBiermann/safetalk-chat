import express, { Application } from 'express'
import { createServer } from 'http'
import * as http from 'http'

class AppServer {
  private express: Application = express()
  public port: number | string = process.env.SERVER_PORT || 5000
  public httpServer: http.Server = createServer(this.express)
  constructor() {}

  private setupConfig() {
    this.express.set('trust proxy', 'loopback')
  }

  public get app(): Application {
    return this.express
  }

  public get server(): http.Server {
    return this.httpServer
  }

  public run(router: express.Router) {
    this.setupConfig()
    this.app.use('/api/v2', router)
    this.httpServer.listen(this.port)
  }
}

export default AppServer
