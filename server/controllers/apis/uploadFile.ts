import { Request, Response, NextFunction } from 'express'

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ fileName: req.file.filename })
  } catch (error) {
    next(error)
  }
}

export { uploadFile }
