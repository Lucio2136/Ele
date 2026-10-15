export type RouterState = {
  user?: string
  direction?: 'back'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function getStateUser(state: unknown): string | null {
  if (!isRecord(state)) return null
  return typeof state.user === 'string' ? state.user : null
}

export function isBackNavigationState(state: unknown): boolean {
  return isRecord(state) && state.direction === 'back'
}
