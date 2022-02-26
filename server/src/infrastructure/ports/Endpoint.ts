import express from 'express'

export default interface IEndpoint {
  exec(appRoute: express.Router): express.Router
}
