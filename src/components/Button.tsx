import type { ComponentProps } from 'react'
import { LoaderCircle } from 'lucide-react'

type ButtonVariant = 'filled' | 'outlined'

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  filled:
    'bg-primary text-white active:bg-primary-pressed disabled:bg-disabled-bg disabled:text-disabled-text',
  outlined:
    'border border-primary bg-white text-primary active:border-primary-pressed active:text-primary-pressed disabled:border-disabled-bg disabled:text-disabled-text',
}

export function Button({
  variant = 'filled',
  loading = false,
  disabled,
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`relative flex h-12 w-full items-center justify-center rounded-full text-[17px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <LoaderCircle
          aria-hidden="true"
          className="absolute size-6 animate-spin"
        />
      )}
      <span className={loading ? 'opacity-0' : undefined}>{children}</span>
    </button>
  )
}
