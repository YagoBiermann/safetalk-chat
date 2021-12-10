import express, { Application, json, urlencoded } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import router from './routes/index'
import { createServer } from 'http'
import * as http from 'http'
import { Database } from './database/connection/index'
import { Server } from 'socket.io'
import { SocketService } from './services/sockets/index'

class AppServer {
  public app: Application
  public port: number | string
  public httpServer: http.Server
  public socket: SocketService
  constructor() {
    this.app = express()
    this.httpServer = createServer(this.app)
    this.port = process.env.SERVER_PORT || 5000
  }

  public async initDB(): Promise<void> {
    const db = new Database()
    await db.connect()
    console.log('Database loaded')
  }

  public initSocket(): void {
    const io = new Server(this.httpServer, {
      path: '/socket.io'
    })
    const socket = new SocketService(io)
    this.socket = socket
    console.log('Sockets loaded')
  }

  public initRoutes(): void {
    this.app.use('/', router)
    console.log('Routes loaded')
  }

  public initMiddlewares(): void {
    this.app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
    this.app.set('trust proxy', 'loopback')
    this.app.use(helmet())
    this.app.use(json())
    this.app.use(urlencoded({ extended: false }))
  }

  public async run(): Promise<void> {
    this.socket.connect()
    this.httpServer.listen(this.port)
    console.log(`Server running on port ${this.port}`)
  }
}

export { AppServer }
