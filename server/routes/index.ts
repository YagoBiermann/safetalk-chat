import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { getUsersByRoom } from '../controllers/apis/getUsersByRoom'
import { getRooms } from '../controllers/apis/getRooms'
import { createUser } from '../controllers/apis/createUser'
import { createRoom } from '../controllers/apis/createRoom'
import { joinRoom } from '../controllers/apis/joinRoom'

import { validateBeforeGetUsers } from '../middlewares/getUsersByRoom'
import { validateBeforeGetRooms } from '../middlewares/getRooms'
import { validateBeforeCreateRoom } from '../middlewares/createRoom'
import { validateBeforeJoinRoom } from '../middlewares/joinRoom'
import { validateBeforeCreateUser } from '../middlewares/createUser'

import { errorHandler } from '../services/errors/errorHandler'

const router = express.Router()

router.get('/api/v2/rooms', validateBeforeGetRooms, getRooms)

router.get('/api/v2/users/:roomCode', validateBeforeGetUsers, getUsersByRoom)

router.post('/api/v2/users/create', validateBeforeCreateUser, createUser)

router.post('/api/v2/rooms/create', validateBeforeCreateRoom, createRoom)

router.post('/api/v2/rooms/join', validateBeforeJoinRoom, joinRoom)

// Error handler middleware
router.use(errorHandler)

// Default redirect to frontend
router.get('*', (req: Request, res: Response, next: NextFunction) => {
  res.redirect(302, 'http://safetalk_client:3000')
})

export default router
