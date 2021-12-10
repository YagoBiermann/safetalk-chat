export default function allowOnlyLetters(
  e: React.ChangeEvent<HTMLInputElement>
): string {
  let sanitizedUsername = e.target.value.replace(/[^a-zA-ZçÇ_]+/g, '')
  return sanitizedUsername
}
