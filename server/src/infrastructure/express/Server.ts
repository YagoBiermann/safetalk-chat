import express, { Application } from 'express'
import https, { Server } from 'https'
import fs from 'fs'

class AppServer {
  private _express: Application = express()
  private _server: Server
  private _port: number | string
  constructor(port: number | string) {
    this._server = https.createServer(this.sslCertificate, this._express)
    this._port = port || process.env.SERVER_PORT || 443
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

  public get sslCertificate() {
    try {
      const cert = fs.readFileSync(__dirname + '/ssl/certificate.crt')
      const key = fs.readFileSync(__dirname + '/ssl/certificate.key')
      return { cert, key }
    } catch (error) {
      console.log('certificate not found')
      process.exit(1)
    }
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
