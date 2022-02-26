import express from 'express'
import { Request, Response } from 'express'
import Endpoint from '../../ports/Endpoint'

class AppRoutes {
  private _router = express.Router()

  constructor(private endpoints: Array<Endpoint>) {}

  private endpoint() {
    this._router.get('rooms/code')
    this._router.get('users/me')
    this._router.get('rooms/:roomCode/users')
    this._router.get('rooms/:roomCode/files/stream/:media')
    this._router.get('rooms/:roomCode/files/:file')
    this._router.post('rooms/:roomCode/files')
    this._router.post('rooms/create')
    this._router.post('rooms/join')

    this._router.get('*', (req: Request, res: Response) => {
      res.redirect(302, 'http://safetalk_client:3000')
    })
  }

  public get router() {
    return this._router
  }

  public exec() {
    this.endpoints.forEach(endpoint => endpoint.exec(this._router))
  }
}

export default AppRoutes
