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
import Room from '../../src/domain/models/room/Room'

describe('integration test on create room API', () => {
  beforeAll(async () => {
    await Program.Main(process.env.MONGO_URI, process.env.SERVER_PORT)
  })

  beforeEach(async () => {
    await UserModel.deleteMany({})
    await RoomModel.deleteMany({})
    jest.clearAllMocks()
    Program.clearSession()
  })

  afterAll(async () => {
    setTimeout(async () => {
      await Program.disconnect()
    }, 5000)
  })

  const roomCode = Room.generateRoomCode().value

  test('should create a room', async () => {
    const requestToCreateUser = await request(Program.server().app)
      .post('/api/v2/users/create')
      .set('Content-Type', 'application/json')
      .send({ username: 'johnDoe' })

    const cookie = requestToCreateUser.headers['set-cookie'][0]
    const response = await request(Program.server().app)
      .post('/api/v2/rooms/create')
      .set('Content-Type', 'application/json')
      .set('Cookie', cookie)
      .send({ roomCode })
    const cookiesFromCreateRoom = response.headers['set-cookie']
    expect(response.statusCode).toBe(201)
    expect(cookiesFromCreateRoom[0]).toMatch(/^CloudFront-Policy/)
    expect(cookiesFromCreateRoom[1]).toMatch(/^CloudFront-Key-Pair-Id/)
    expect(cookiesFromCreateRoom[2]).toMatch(/^CloudFront-Signature/)
    expect(cookiesFromCreateRoom[3]).toMatch(/^connect.sid/)
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    )
  })
})
