import { Request, Response, NextFunction } from 'express'

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(201)
      .json({ fileName: req.file.filename, mimeType: req.file.mimetype })
  } catch (error) {
    next(error)
  }
}

export { uploadFile }
