import type { ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col bg-white">
      {children}
    </div>
  )
}
