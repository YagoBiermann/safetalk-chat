import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { getUsersByRoom } from '../controllers/apis/getUsersByRoom'
import { createUser } from '../controllers/apis/createUser'
import { createRoom } from '../controllers/apis/createRoom'
import { joinRoom } from '../controllers/apis/joinRoom'
import { uploadFile } from '../controllers/apis/uploadFile'
import { getFile } from '../controllers/apis/getFile'
import { streamMedia } from '../controllers/apis/streamMedia'
import { getUser } from '../controllers/apis/getUser'
import { generateCode } from '../controllers/apis/generateCode'

import { validateBeforeGetUser } from '../middlewares/getUser'
import { validateBeforeGetUsers } from '../middlewares/getUsersByRoom'
import { validateBeforeCreateRoom } from '../middlewares/createRoom'
import { validateBeforeJoinRoom } from '../middlewares/joinRoom'
import { validateBeforeCreateUser } from '../middlewares/createUser'
import { validateStream } from '../middlewares/streamMedia'
import { validateBeforeGetFile } from '../middlewares/getFile'
import { upload } from '../middlewares/uploadFile'
import { authenticate } from '../middlewares/authenticate'

import { errorHandler } from '../services/errors/errorHandler'

const router = express.Router()
router.use(authenticate)

router.get('/api/v2/rooms/code', generateCode)
router.get('/api/v2/users/me', validateBeforeGetUser, getUser)
router.get(
  '/api/v2/rooms/:roomCode/users',
  validateBeforeGetUsers,
  getUsersByRoom
)
router.get(
  '/api/v2/rooms/:roomCode/files/stream/:media',
  validateStream,
  streamMedia
)
router.get(
  '/api/v2/rooms/:roomCode/files/:file',
  validateBeforeGetFile,
  getFile
)
router.post('/api/v2/rooms/:roomCode/files', upload.single('file'), uploadFile)
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
