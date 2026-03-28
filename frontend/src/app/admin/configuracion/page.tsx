'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

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
        <h1 style={{ color: '#1e3a5f' }}>Configuración</h1>
        <a href="/admin" className="back-btn">
          ← Volver al panel
        </a>
      </div>

      <Card className="text-center p-5" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Card.Body>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e3a5f' }}>⚙️ Próximamente</h2>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Esta sección permitirá configurar:
          </p>
          <ul style={{ textAlign: 'left', display: 'inline-block', color: '#6c757d' }} className="mt-3">
            <li>Información de contacto</li>
            <li>Redes sociales</li>
            <li>Texto de bienvenida</li>
            <li>Preferencias de notificación</li>
          </ul>
        </Card.Body>
      </Card>

      <style jsx>{`
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #1e3a5f;
          background: #ffffff;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          border: 1px solid #1e3a5f;
          transition: all 0.2s ease;
          text-decoration: none;
          font-weight: 500;
        }
        .back-btn:hover {
          background: #1e3a5f;
          color: #ffffff;
          transform: translateX(-4px);
        }
      `}</style>
    </Container>
  )
}
