import AppServer from '../infrastructure/express/Server'
import AppMiddlewares from '../infrastructure/express/middlewares/AppMiddlewares'
import AppRoutes from '../infrastructure/express/routes/AppRoutes'
import AppSession from '../infrastructure/express/session/AppSession'
import ExpressControllerFactory, {
  ExpressControllers
} from '../adapter/controllers/ExpressControllerFactory'
import { Database } from '../infrastructure/database/connection'
import MongoStore from 'connect-mongo'
import SocketControllerFactory, {
  SocketControllers
} from '../adapter/controllers/SocketControllerFactory'
import AppSocket from '../infrastructure/socket.io/AppSocket'

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
const generateRoomCodeController = ExpressControllerFactory.make(
  ExpressControllers.GenerateRoomCodeController
)
const createUserController = ExpressControllerFactory.make(
  ExpressControllers.CreateUserController
)
const createRoomController = ExpressControllerFactory.make(
  ExpressControllers.CreateRoomController
)
const joinRoomController = ExpressControllerFactory.make(
  ExpressControllers.JoinRoomController
)
const userInfoController = ExpressControllerFactory.make(
  ExpressControllers.UserInfoController
)
const getAllUsersFromRoomController = ExpressControllerFactory.make(
  ExpressControllers.GetAllUsersFromRoomController
)
const uploadFileController = ExpressControllerFactory.make(
  ExpressControllers.UploadFileController
)

const routes = new AppRoutes()
routes.addController(createUserController)
routes.addController(generateRoomCodeController)
routes.addController(createRoomController)
routes.addController(joinRoomController)
routes.addController(userInfoController)
routes.addController(getAllUsersFromRoomController)
routes.addController(uploadFileController)

// Socket Events Controller
const joinRoomEventController = SocketControllerFactory.make(
  SocketControllers.JoinRoomEventController
)
const GetAllUsersFromRoomEventController = SocketControllerFactory.make(
  SocketControllers.GetAllUsersFromRoomEventController
)

const userDisconnectEventController = SocketControllerFactory.make(
  SocketControllers.UserDisconnectEventController
)

const sendMessageEventController = SocketControllerFactory.make(
  SocketControllers.SendMessageEventController
)

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
