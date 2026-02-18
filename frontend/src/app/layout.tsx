import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.scss'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Estudio Contable JY',
  description: 'Estudio dedicado a brindar asesoramiento integral y personalizado en materia impositiva, contable, laboral y societaria.',
  keywords: 'estudio contable, asesoramiento, impuestos, contabilidad, pyme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
