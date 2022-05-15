import request from 'supertest'
import {
  describe,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  test,
  jest
} from '@jest/globals'
import Program from '../../src/main/index'
import { User as UserModel } from '../../src/infrastructure/database/models/users'
import { Room as RoomModel } from '../../src/infrastructure/database/models/rooms'
import { Database } from '../../src/infrastructure/database/connection'

describe('integration test on create user API', () => {
  beforeAll(async () => {
    Program.Main(process.env.MONGO_URI, process.env.SERVER_PORT)
  })

  afterAll(async () => {
    await Program.disconnect()
  })

  beforeEach(async () => {
    await UserModel.deleteMany({})
    await RoomModel.deleteMany({})
    jest.clearAllMocks()
  })

  test('should create user', async () => {
    const response = await request(Program.server().app)
      .post('/api/v2/users/create')
      .set('Content-Type', 'application/json')
      .send({ username: 'johnDoe' })
    expect(response.status).toBe(201)
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    )
    expect(response.headers['set-cookie']).toBeDefined()
  })

  test('should return username already in use', async () => {
    const username = 'johnDoe'
    await request(Program.server().app)
      .post('/api/v2/users/create')
      .set('Content-Type', 'application/json')
      .send({ username })
    const response = await request(Program.server().app)
      .post('/api/v2/users/create')
      .set('Content-Type', 'application/json')
      .send({ username })
    expect(response.status).toBe(403)
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    )
    expect(response.body.message).toBe('Username already in use')
  })

  test('should return username is required', async () => {
    const response = await request(Program.server().app)
      .post('/api/v2/users/create')
      .set('Content-Type', 'application/json')
      .send({})
    expect(response.status).toBe(400)
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    )
    expect(response.body.message).toBe('Username not provided')
  })

  test('should return username has invalid characters', async () => {
    const username = 'johnDoe!%46'
    const response = await request(Program.server().app)
      .post('/api/v2/users/create')
      .set('Content-Type', 'application/json')
      .send({ username })
    expect(response.status).toBe(400)
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    )
    expect(response.body.message).toBe('The username has invalid characters')
  })

  test('should return an error if username is greater than 25 characters', async () => {
    const username = 'johnDoe'.repeat(10)
    const response = await request(Program.server().app)
      .post('/api/v2/users/create')
      .set('Content-Type', 'application/json')
      .send({ username })
    expect(response.status).toBe(400)
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    )
    expect(response.body.message).toBe(
      'username must be longer than 3 characters and shorter than 25 characters'
    )
  })

  test('should return an error if username is shorter than 3 characters', async () => {
    const username = 'jo'
    const response = await request(Program.server().app)
      .post('/api/v2/users/create')
      .set('Content-Type', 'application/json')
      .send({ username })
    expect(response.status).toBe(400)
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    )
    expect(response.body.message).toBe(
      'username must be longer than 3 characters and shorter than 25 characters'
    )
  })
})
