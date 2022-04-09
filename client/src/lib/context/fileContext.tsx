import React from 'react'
import { FileWithPreview } from '../interfaces'

type FilesContext = {
  files: Array<FileWithPreview>
  setFiles: React.Dispatch<React.SetStateAction<Array<FileWithPreview>>>
}

const DEFAULT_VALUE = {
  files: [],
  setFiles: () => {}
}

const fileContext = React.createContext<FilesContext>(DEFAULT_VALUE)

export type { FilesContext }
export { fileContext }
