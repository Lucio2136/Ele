import type { ReactNode } from 'react'
import { Routes, useLocation, useNavigationType } from 'react-router-dom'
import { isBackNavigationState } from '../lib/routerState'

type AnimatedRoutesProps = {
  children: ReactNode
}

export function AnimatedRoutes({ children }: AnimatedRoutesProps) {
  const location = useLocation()
  const isBack =
    useNavigationType() === 'POP' || isBackNavigationState(location.state)
  const isInitialEntry = location.key === 'default'
  const animation = isInitialEntry
    ? ''
    : isBack
      ? 'animate-slide-from-left'
      : 'animate-slide-from-right'

  return (
    <div className="overflow-x-hidden">
      <div
        key={location.pathname}
        className={`${animation} motion-reduce:animate-none`}
      >
        <Routes location={location}>{children}</Routes>
      </div>
    </div>
  )
}
