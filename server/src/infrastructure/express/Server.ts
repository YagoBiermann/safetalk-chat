import express, { Application } from 'express'

class AppServer {
  private express: Application = express()
  public port: number | string = process.env.SERVER_PORT || 5000
  constructor() {}

  private setupConfig() {
    this.express.set('trust proxy', 'loopback')
  }

  public get app(): Application {
    return this.express
  }

  public run(router: express.Router) {
    this.setupConfig()
    this.app.use('/api/v2', router)
    this.app.listen(this.port)
  }
}

export default AppServer
