import { useId, useState, type ComponentProps } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type TextInputSize = 'md' | 'lg'

type TextInputProps = Omit<ComponentProps<'input'>, 'placeholder'> & {
  label: string
  error?: string
  inputSize?: TextInputSize
}

const heightClasses: Record<TextInputSize, string> = {
  md: 'h-12',
  lg: 'h-[54px]',
}

export function TextInput({
  label,
  error,
  inputSize = 'md',
  required,
  type = 'text',
  id,
  className = '',
  ...props
}: TextInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const isPassword = type === 'password'
  const [passwordVisible, setPasswordVisible] = useState(false)

  const borderColor = error
    ? 'border-error focus:border-error focus:ring-error'
    : 'border-border focus:border-primary focus:ring-primary'
  const labelColor = error
    ? 'text-error'
    : 'text-text-gray peer-placeholder-shown:text-disabled-text peer-focus:text-primary'

  return (
    <div className={className}>
      <div className="relative">
        <input
          {...props}
          id={inputId}
          type={isPassword && passwordVisible ? 'text' : type}
          placeholder=" "
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`peer ${heightClasses[inputSize]} w-full rounded-[13px] border-[1.5px] bg-white px-[21px] text-[16.5px] text-text-dark outline-none transition-colors focus:ring-1 motion-reduce:transition-none ${borderColor} ${isPassword ? 'pr-13' : ''}`}
        />
        <label
          htmlFor={inputId}
          className={`pointer-events-none absolute left-[10.5px] top-0 -translate-y-1/2 bg-white px-1 text-[14.5px] leading-none transition-all motion-reduce:transition-none peer-placeholder-shown:left-[17px] peer-placeholder-shown:top-1/2 peer-placeholder-shown:mt-0.5 peer-placeholder-shown:text-[16.5px] peer-focus:left-[10.5px] peer-focus:top-0 peer-focus:mt-0 peer-focus:text-[14.5px] ${labelColor}`}
        >
          {label}
          {required && <span aria-hidden="true">*</span>}
        </label>
        {isPassword && (
          <button
            type="button"
            onClick={() => setPasswordVisible((visible) => !visible)}
            aria-label={passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={passwordVisible}
            className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-text-gray focus-visible:outline-2 focus-visible:outline-primary"
          >
            {passwordVisible ? (
              <EyeOff aria-hidden="true" strokeWidth={1.5} className="size-5" />
            ) : (
              <Eye aria-hidden="true" strokeWidth={1.5} className="size-5" />
            )}
          </button>
        )}
      </div>
      <p
        id={errorId}
        aria-live="polite"
        className="px-[22px] text-[14px] text-error not-empty:mt-1.5"
      >
        {error}
      </p>
    </div>
  )
}
