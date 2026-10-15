import { z } from 'zod'

export const userSchema = z
  .string()
  .trim()
  .min(1, 'Ingresa tu usuario o correo electrónico')
  .refine(
    (value) => !value.includes('@') || z.email().safeParse(value).success,
    'Escribe un correo válido, por ejemplo nombre@empresa.com',
  )

export const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')

export const loginUserSchema = z.object({ user: userSchema })
export type LoginUserValues = z.infer<typeof loginUserSchema>

export const loginPasswordSchema = z.object({ password: passwordSchema })
export type LoginPasswordValues = z.infer<typeof loginPasswordSchema>

export const otpSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'El código debe tener 6 dígitos'),
  rememberDevice: z.boolean(),
})
export type OtpValues = z.infer<typeof otpSchema>
