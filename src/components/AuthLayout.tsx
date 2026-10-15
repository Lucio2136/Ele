import type { ReactNode } from 'react'
import { Header } from './Header'
import { PageContainer } from './PageContainer'

type AuthLayoutProps = {
  title: string
  subtitle: ReactNode
  compact?: boolean
  children: ReactNode
}

export function AuthLayout({
  title,
  subtitle,
  compact = false,
  children,
}: AuthLayoutProps) {
  return (
    <PageContainer>
      <Header />
      <main
        className={`flex flex-1 flex-col items-center px-[10%] ${compact ? 'pt-[105px]' : 'pt-[115px]'}`}
      >
        <h1 className="text-center text-[28.5px] leading-[32px] font-medium text-title">
          {title}
        </h1>
        <p className="mt-[17.5px] text-center text-[19px] leading-[27px] text-text-gray">
          {subtitle}
        </p>
        <div className="mt-[23.5px] w-full">{children}</div>
      </main>
    </PageContainer>
  )
}
