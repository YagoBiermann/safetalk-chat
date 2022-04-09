import express from 'express'
export default interface IRouteController {
  handle(router: express.Router): Promise<express.Router>
}
