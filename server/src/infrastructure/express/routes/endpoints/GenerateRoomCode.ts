import express from 'express'
import IGenerateRoomCodeController from '../../../../adapter/ports/controllers/GenerateRoomCode'
import IEndpoint from '../../../ports/Endpoint'

class GenerateRoomCodeEndpoint implements IEndpoint {
  constructor(private controller: IGenerateRoomCodeController) {}

  public exec(appRoute: express.Router): express.Router {
    return appRoute.get('/rooms/code', async (req, res, next) => {
      try {
        const userId = req.session.user
        const accessKey = req.session.accessKey
        const response = await this.controller.handle({ userId, accessKey })

        return res.status(response.status).json(response.body)
      } catch (error) {
        next(error)
      }
    })
  }
}

export default GenerateRoomCodeEndpoint
