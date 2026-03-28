import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.scss'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://estudiocontablejy.com.ar'),
  title: {
    default: 'Estudio Contable JY | Asesoramiento Integral',
    template: '%s | Estudio Contable JY',
  },
  description: 'Estudio dedicado a brindar asesoramiento integral y personalizado en materia impositiva, contable, laboral y societaria. Soluciones contables, financieras y tecnológicas para PyMEs.',
  keywords: ['estudio contable', 'asesoramiento', 'impuestos', 'contabilidad', 'pyme', 'Argentina', 'liquidacion de impuestos', 'balance', 'auditoria'],
  authors: [{ name: 'Estudio Contable JY' }],
  creator: 'Estudio Contable JY',
  publisher: 'Estudio Contable JY',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://estudiocontablejy.com.ar',
    siteName: 'Estudio Contable JY',
    title: 'Estudio Contable JY | Asesoramiento Integral',
    description: 'Estudio dedicado a brindar asesoramiento integral y personalizado en materia impositiva, contable, laboral y societaria.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Estudio Contable JY',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estudio Contable JY',
    description: 'Asesoramiento integral en materia impositiva, contable, laboral y societaria.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://estudiocontablejy.com.ar',
  },
  verification: {
    google: 'tu-codigo-de-verificacion-google',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/images/logos/Logo_Favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logos/Logo_Favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
