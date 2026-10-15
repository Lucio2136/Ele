import type { ComponentProps } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type TextLinkSize = 'md' | 'lg'

const sizeClasses: Record<TextLinkSize, string> = {
  md: 'text-[16.5px]',
  lg: 'text-[18.5px]',
}

const baseClassName =
  'rounded font-medium text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

type SizeProp = { size?: TextLinkSize }

export function TextLink({
  size = 'md',
  className = '',
  ...props
}: LinkProps & SizeProp) {
  return (
    <Link
      className={`${baseClassName} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
}

export function TextButton({
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ComponentProps<'button'> & SizeProp) {
  return (
    <button
      type={type}
      className={`${baseClassName} ${sizeClasses[size]} disabled:cursor-not-allowed disabled:text-disabled-text ${className}`}
      {...props}
    />
  )
}
