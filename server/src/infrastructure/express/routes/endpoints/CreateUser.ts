import express from 'express'
import ICreateUserController from '../../../../adapter/ports/controllers/CreateUser'
import { ICreateUserOutputDTO } from '../../../../application/ports/services/CreateUser'
import IEndpoint from '../../../ports/Endpoint'

class CreateUserEndpoint implements IEndpoint {
  constructor(private controller: ICreateUserController) {}

  public exec(appRoute: express.Router): express.Router {
    return appRoute.post('/users/create', async (req, res, next) => {
      try {
        const response = await this.controller.handle({
          username: req.body.username,
          userId: req.session.user
        })

        if (response.status >= 200 && response.status < 300) {
          const successfulResponse =
            response as HttpResponseDTO<ICreateUserOutputDTO>
          req.session.destroy
          req.session.user = successfulResponse.body.userId
          req.session.accessKey = successfulResponse.body.accessKey
        }

        return res.status(response.status).json(response.body)
      } catch (error) {
        next(error)
      }
    })
  }
}

export default CreateUserEndpoint
