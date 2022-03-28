import AppServer from '../infrastructure/express/Server'
import AppMiddlewares from '../infrastructure/express/middlewares/AppMiddlewares'
import AppRoutes from '../infrastructure/express/routes/AppRoutes'
import AppSession from '../infrastructure/express/session/AppSession'
import ExpressControllerFactory from '../adapter/controllers/ExpressControllerFactory'
import { Database } from '../infrastructure/database/connection'
import env from 'dotenv'
import MongoStore from 'connect-mongo'
import SocketControllerFactory from '../adapter/controllers/SocketControllerFactory'
import AppSocket from '../infrastructure/socket.io/AppSocket'

env.config({ path: __dirname + '/config/.dev.env' })

Database.instance().connect(process.env.MONGO_URI)

const expressServer = new AppServer()
const middlewares = new AppMiddlewares(expressServer.app)
const socketServer = new AppSocket(expressServer.server)

const session = new AppSession(expressServer.app, {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  cookie: { maxAge: 600000, httpOnly: true, path: '/', sameSite: 'strict' }, // 10 minutes
  resave: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  })
})

// Express route controllers
const generateRoomCodeController =
  ExpressControllerFactory.makeGenerateRoomCodeController()
const createUserController = ExpressControllerFactory.makeCreateUserController()
const createRoomController = ExpressControllerFactory.makeCreateRoomController()
const joinRoomController = ExpressControllerFactory.makeJoinRoomController()
const userInfoController = ExpressControllerFactory.makeUserInfoController()
const getAllUsersFromRoomController =
  ExpressControllerFactory.makeGetAllUsersFromRoomController()
const uploadFileController = ExpressControllerFactory.makeUploadFileController()

const routes = new AppRoutes()
routes.addController(createUserController)
routes.addController(generateRoomCodeController)
routes.addController(createRoomController)
routes.addController(joinRoomController)
routes.addController(userInfoController)
routes.addController(getAllUsersFromRoomController)
routes.addController(uploadFileController)

// Socket Events Controller
const joinRoomEventController =
  SocketControllerFactory.makeJoinRoomEventController()
const GetAllUsersFromRoomEventController =
  SocketControllerFactory.makeGetAllUsersFromRoomEventController()

const userDisconnectEventController =
  SocketControllerFactory.makeUserDisconnectEventController()

const sendMessageEventController =
  SocketControllerFactory.makeSendMessageEventController()

socketServer.addController(joinRoomEventController)
socketServer.addController(GetAllUsersFromRoomEventController)
socketServer.addController(userDisconnectEventController)
socketServer.addController(sendMessageEventController)

// App execution
session.exec()
middlewares.exec()
routes.exec()
socketServer.socketSession(session.session)
socketServer.exec()
expressServer.run(routes.router)
