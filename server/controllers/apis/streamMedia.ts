import { Request, Response, NextFunction } from 'express'
import { IMediaStream } from '../../routes/interfaces'
import fs from 'fs'
import mime from 'mime-types'

const streamMedia = async (
  req: Request<IMediaStream>,
  res: Response,
  next: NextFunction
) => {
  const { roomCode, media } = req.params
  const range = req.headers.range

  const mediaPath = `./temp/${roomCode}/files/${media}`
  const mediaSize = fs.statSync(mediaPath).size

  const chunkSize = 1024 * 1024 * 5

  const start = Number(range.replace(/\D/g, ''))
  const end = Math.min(start + chunkSize, mediaSize - 1)

  const contentLength = end - start + 1
  const contentType = mime.lookup(mediaPath) || 'application/octet-stream'

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${mediaSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': contentType
  }
  res.writeHead(206, headers)

  const mediaStream = fs.createReadStream(mediaPath, { start, end })

  mediaStream.pipe(res)
}

export { streamMedia }
