import { FileWithPreview } from '../interfaces'

const createFilePreview = (file: File): FileWithPreview => {
  const dropFile = Object.assign(file, { preview: URL.createObjectURL(file) })
  return dropFile
}

export default createFilePreview
