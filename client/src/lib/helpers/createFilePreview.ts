const createFilePreview = (file: File) => {
  const dropFile = Object.assign(file, { preview: URL.createObjectURL(file) })
  return dropFile
}

export default createFilePreview
