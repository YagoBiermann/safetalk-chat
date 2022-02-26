import { Application, json, urlencoded } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

class AppMiddlewares {
  constructor(private app: Application) {}

  public exec(): void {
    this.app.use(json())
    this.app.use(helmet())
    this.app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
    this.app.use(cookieParser())
    this.app.use(urlencoded({ extended: false }))
  }
}

export default AppMiddlewares
