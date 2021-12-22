export const getFileExtension = (fileName: string) => {
  if (!fileName.includes('.')) {
    return ''
  }

  const fileExtension = fileName.split('.').pop()

  return fileExtension
}
