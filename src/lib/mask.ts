const VISIBLE_CHARS = 4

function maskPart(part: string): string {
  const hidden = Math.max(part.length - VISIBLE_CHARS, 0)
  return part.slice(0, VISIBLE_CHARS) + '*'.repeat(hidden)
}

export function maskIdentifier(value: string): string {
  const at = value.indexOf('@')
  if (at === -1) return maskPart(value)
  return `${maskPart(value.slice(0, at))}@${maskPart(value.slice(at + 1))}`
}
