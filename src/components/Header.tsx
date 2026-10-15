import type { ReactNode } from 'react'

type HeaderProps = {
  action?: ReactNode
}

export function Header({ action }: HeaderProps) {
  return (
    <header className="flex h-[71px] shrink-0 items-center justify-between px-3">
      <img src="/img/logo-konfio.svg" alt="Konfío" className="h-[25px] w-auto" />
      {action}
    </header>
  )
}
