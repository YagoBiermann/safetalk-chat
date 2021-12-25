import { Request, Response, NextFunction } from 'express'
import { IFileUpload } from '../../routes/interfaces'

const getFile = async (
  req: Request<IFileUpload>,
  res: Response,
  next: NextFunction
) => {
  const { roomCode, file } = req.params
  try {
    if (req.headers['content-type'].includes('image')) {
      res.status(200).sendFile(`/temp/${roomCode}/files/${file}`, { root: '.' })
    }

    if (req.headers['content-type'].includes('application')) {
      res.status(200).download(`./temp/${roomCode}/files/${file}`, file)
    }
  } catch (error) {
    next(error)
  }
}

export { getFile }
