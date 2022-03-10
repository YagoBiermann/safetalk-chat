import express from 'express'
export default interface IController {
  handle(router: express.Router): Promise<express.Router>
}
