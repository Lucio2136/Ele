/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_RESPONSE_DELAY_MS: string
  readonly VITE_AUTH_OTP_CODE: string
  readonly VITE_AUTH_ERROR_PASSWORD: string
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
