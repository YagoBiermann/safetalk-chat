import multer from 'multer'
import { randomUUID } from 'crypto'
import fs from 'fs'
import { MulterError } from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const roomCode = req.params.roomCode

    if (!fs.existsSync(`./temp/${roomCode}/files`)) {
      fs.mkdirSync(`./temp/${roomCode}/files`, { recursive: true })
    }

    cb(null, `./temp/${roomCode}/files`)
  },
  filename: (req, file, cb) => {
    cb(null, randomUUID())
  }
})

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const fileSize = Number(req.headers['content-length'])
    if (file.mimetype.includes('image') && fileSize > 16777216) {
      cb(new MulterError('LIMIT_FILE_SIZE'))
    }

    if (file.mimetype.includes('audio') && fileSize > 67108864) {
      cb(new MulterError('LIMIT_FILE_SIZE'))
    }

    cb(null, true)
  },
  limits: { fileSize: 1073741824, files: 1 }
})

export { upload }
