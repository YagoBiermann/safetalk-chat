import express from 'express'
import { Request, Response } from 'express'
import IRouteController from '../../../adapter/ports/controllers/RouteController'

class AppRoutes {
  private _router = express.Router()
  private controllers: Array<IRouteController> = []

  constructor() {}

  private redirect() {
    this._router.get('*', (req: Request, res: Response) => {
      res.redirect(302, 'http://safetalk_client:3000')
    })
  }

  public addController(controller: IRouteController) {
    this.controllers.push(controller)
  }

  public get router() {
    return this._router
  }

  public exec() {
    this.controllers.forEach(controller => controller.handle(this._router))
    this.redirect()
  }
}

export default AppRoutes
