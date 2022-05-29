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
import { Server } from 'socket.io'

class Program {
  private static _server: AppServer
  private static _sessionStore: MongoStore
  private static _socketServer: Server
  public static server(): AppServer {
    return this._server
  }

  public static async disconnect(): Promise<void> {
    Database.instance().disconnect()
    this._sessionStore.close()
    this._socketServer.close()
    this._server.close()
  }

  public static clearSession(): void {
    this._sessionStore.clear()
  }

  public static async Main(
    mongoUri: string,
    serverPort: number | string
  ): Promise<void> {
    await Database.instance().connect(mongoUri)

    this._server = new AppServer(serverPort)
    const middlewares = new AppMiddlewares(this._server.app)
    const socketServer = new AppSocket(this._server.server)
    this._socketServer = socketServer.server
    this._sessionStore = MongoStore.create({
      mongoUrl: mongoUri,
      collectionName: 'sessions'
    })

    const session = new AppSession(this._server.app, {
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      cookie: { maxAge: 600000, httpOnly: true, path: '/', sameSite: 'strict' }, // 10 minutes
      resave: true,
      store: this._sessionStore
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
    this._server.run(routes.router)
  }
}
if (process.env.NODE_ENV !== 'test') {
  Program.Main(process.env.MONGO_URI, process.env.SERVER_PORT)
}

export default Program
