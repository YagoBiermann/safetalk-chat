import React, { useContext } from 'react'
import { DropFile } from '../interfaces'

type FilesContext = {
  files: Array<DropFile>
  setFiles: React.Dispatch<React.SetStateAction<Array<DropFile>>>
}

const DEFAULT_VALUE = {
  files: [],
  setFiles: () => {}
}

const fileContext = React.createContext<FilesContext>(DEFAULT_VALUE)

export type { FilesContext }
export { fileContext }
