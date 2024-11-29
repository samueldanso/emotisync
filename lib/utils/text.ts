export function generateTypewriterKey(
  char: string,
  index: number,
  prefix: string,
) {
  // Use character code and position to create a unique key
  return `${prefix}-${char.charCodeAt(0)}-${index}`
}
