import express from 'express'
import { Request, Response } from 'express'
import IRouteController from '../../../adapter/ports/controllers/RouteController'

class AppRoutes {
  private _router = express.Router()

  constructor(private controllers: Array<IRouteController>) {}

  private redirect() {
    this._router.get('*', (req: Request, res: Response) => {
      res.redirect(302, 'http://safetalk_client:3000')
    })
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
