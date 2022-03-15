import AppServer from '../infrastructure/express/Server'
import AppMiddlewares from '../infrastructure/express/middlewares/AppMiddlewares'
import AppRoutes from '../infrastructure/express/routes/AppRoutes'
import AppSession from '../infrastructure/express/session/AppSession'
import ControllerFactory from '../adapter/controller/ControllerFactory'
import { Database } from '../infrastructure/database/connection'
import env from 'dotenv'
import MongoStore from 'connect-mongo'

env.config({ path: __dirname + '/config/.dev.env' })

Database.instance().connect(process.env.MONGO_URI)

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

const controllers = []
const generateRoomCodeController =
  ControllerFactory.makeGenerateRoomCodeController()
const createUserController = ControllerFactory.makeCreateUserController()
const createRoomController = ControllerFactory.makeCreateRoomController()
const joinRoomController = ControllerFactory.makeJoinRoomController()
const userInfoController = ControllerFactory.makeUserInfoController()
const getAllUsersFromRoomController =
  ControllerFactory.makeGetAllUsersFromRoomController()

controllers.push(
  createUserController,
  generateRoomCodeController,
  createRoomController,
  joinRoomController,
  userInfoController,
  getAllUsersFromRoomController
)

const appRoutes = new AppRoutes(controllers)

session.exec()
middlewares.exec()
appRoutes.exec()
server.run(appRoutes.router)
