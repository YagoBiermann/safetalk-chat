import { useEffect, useState } from 'react'
import { FileWithPreview } from '../interfaces'

const useFilePreview = () => {
  const [files, setFiles] = useState<Array<FileWithPreview>>([])
  const [showPreview, setPreview] = useState(false)
  const clearPreview = () => {
    files.forEach(file => {
      URL.revokeObjectURL(file.preview)
    })
    setFiles([])
  }

  const closeWithoutSave = () => {
    clearPreview()
    setPreview(false)
  }

  const closePreview = () => {
    setPreview(false)
  }

  useEffect(() => {
    if (files.length > 0) {
      setPreview(true)
    }
  }, [files])

  return { files, setFiles, showPreview, closePreview, closeWithoutSave }
}

export default useFilePreview
