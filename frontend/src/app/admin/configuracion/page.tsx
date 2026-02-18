'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Container from 'react-bootstrap/Container'

export default function ConfiguracionPage() {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    } else if (!loading && isAuthenticated && !isAdmin) {
      router.push('/')
    }
  }, [loading, isAuthenticated, isAdmin, router])

  if (loading) {
    return (
      <Container className="text-center" style={{ paddingTop: '150px' }}>
        <p>Cargando...</p>
      </Container>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <Container style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Configuración</h1>
        <a 
          href="/admin" 
          style={{ color: '#fff', opacity: 0.7 }}
        >
          ← Volver al panel
        </a>
      </div>

      <div className="aside1 text-center">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚙️ Próximamente</h2>
        <p style={{ opacity: 0.8 }}>
          Esta sección permitirá configurar:
        </p>
        <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '1rem' }}>
          <li>Información de contacto</li>
          <li>Redes sociales</li>
          <li>Texto de bienvenida</li>
          <li>Preferencias de notificación</li>
        </ul>
      </div>
    </Container>
  )
}
