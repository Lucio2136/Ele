import { Header } from '../components/Header'
import { PageContainer } from '../components/PageContainer'
import { TextLink } from '../components/TextLink'

export function UnavailablePage() {
  return (
    <PageContainer>
      <Header />
      <main className="flex flex-1 flex-col items-center gap-6 px-10 pt-[112px] text-center">
        <h1 className="text-[28px] font-medium text-title">
          Esta pantalla aún no está disponible
        </h1>
        <TextLink to="/login">Volver a iniciar sesión</TextLink>
      </main>
    </PageContainer>
  )
}
