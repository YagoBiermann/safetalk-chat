import env from 'dotenv'
import { AppServer } from './server'
env.config({ path: './config/.dev.env' })

const server = new AppServer()

async function main(): Promise<void> {
  await server.initDB()
  server.initMiddlewares()
  server.initRoutes()
  server.initSocket()
  server.run()
}

main()
