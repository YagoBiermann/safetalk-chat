const serializeFile = (file: File) => {
  const serializedFile = Object.assign({
    preview: URL.createObjectURL(file),
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  })
  return serializedFile
}

export default serializeFile
