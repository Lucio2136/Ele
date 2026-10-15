import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { AnimatedRoutes } from './components/AnimatedRoutes'
import { LoginOtpPage } from './pages/LoginOtpPage'
import { LoginPage } from './pages/LoginPage'
import { LoginPasswordPage } from './pages/LoginPasswordPage'
import { UnavailablePage } from './pages/UnavailablePage'

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/password" element={<LoginPasswordPage />} />
        <Route path="/login/otp" element={<LoginOtpPage />} />
        <Route path="*" element={<UnavailablePage />} />
      </AnimatedRoutes>
    </BrowserRouter>
  )
}

export default App
