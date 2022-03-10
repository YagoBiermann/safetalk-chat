import express from 'express'
import { Request, Response } from 'express'
import IController from '../../../adapter/ports/controllers/Controller'
import DomainEventPublisher from '../../../domain/models/common/DomainEventPublisher'

class AppRoutes {
  private _router = express.Router()

  constructor(private controllers: Array<IController>) {}

  private endpoint() {
    this._router.get('rooms/:roomCode/users')
    this._router.get('rooms/:roomCode/files/stream/:media')
    this._router.get('rooms/:roomCode/files/:file')
    this._router.post('rooms/:roomCode/files')

    this._router.get('*', (req: Request, res: Response) => {
      res.redirect(302, 'http://safetalk_client:3000')
    })
  }

  public get router() {
    return this._router
  }

  public exec() {
    DomainEventPublisher.instance().removeAllSubscribers()
    this.controllers.forEach(controllers => controllers.handle(this._router))
  }
}

export default AppRoutes
