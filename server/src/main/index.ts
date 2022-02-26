import AppServer from '../infrastructure/express/Server'
import AppMiddlewares from '../infrastructure/express/middlewares'
import AppRoutes from '../infrastructure/express/routes/AppRoutes'
import AppSession from '../infrastructure/express/session'
import CreateUserFactory from './factories/CreateUser'
import GenerateRoomCodeFactory from './factories/GenerateRoomCode'
import { Database } from '../infrastructure/database/connection'
import env from 'dotenv'
import MongoStore from 'connect-mongo'

env.config({ path: __dirname + '/config/.dev.env' })

const mongodb = new Database(process.env.MONGO_URI)
mongodb.connect()

const server = new AppServer()
const middlewares = new AppMiddlewares(server.app)

const session = new AppSession(server.app, {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  cookie: { maxAge: 600000, httpOnly: true, path: '/' }, // 10 minutes
  resave: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  })
})

const endpoints = []
const generateRoomCodeEndpoint = new GenerateRoomCodeFactory().make()
const createUserEndpoint = new CreateUserFactory().make()

endpoints.push(createUserEndpoint, generateRoomCodeEndpoint)

const appRoutes = new AppRoutes(endpoints)

session.exec()
middlewares.exec()
appRoutes.exec()
server.run(appRoutes.router)
