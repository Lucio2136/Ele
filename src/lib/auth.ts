const RESPONSE_DELAY_MS = Number(import.meta.env.VITE_AUTH_RESPONSE_DELAY_MS)
const VALID_OTP_CODE = import.meta.env.VITE_AUTH_OTP_CODE
const ERROR_PASSWORD = import.meta.env.VITE_AUTH_ERROR_PASSWORD

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export class AuthError extends Error {}

export async function signIn(user: string, password: string): Promise<void> {
  await delay(RESPONSE_DELAY_MS)
  if (!user || password === ERROR_PASSWORD) {
    throw new AuthError(
      'Correo o contraseña incorrectos. Revisa tus datos e inténtalo de nuevo.',
    )
  }
}

export async function verifyOtpCode(code: string): Promise<void> {
  await delay(RESPONSE_DELAY_MS)
  if (code !== VALID_OTP_CODE) {
    throw new AuthError(
      'El código no es correcto. Revisa el correo e inténtalo de nuevo.',
    )
  }
}

export async function resendOtpCode(): Promise<void> {
  await delay(RESPONSE_DELAY_MS / 2)
}
