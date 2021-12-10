const allowOnlyLettersAndNumbers = (
  e: React.ChangeEvent<HTMLInputElement>
): string => {
  const sanitizedRoomCode = e.target.value.replace(/[^a-zA-Z0-9]+/g, '')
  return sanitizedRoomCode
}

export default allowOnlyLettersAndNumbers
