'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function AdminPage() {
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

  const adminCards = [
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar usuarios registrados, roles y estados.',
      icon: '👥',
      href: '/admin/usuarios',
      color: '#e94560'
    },
    {
      title: 'Herramientas Digitales',
      description: 'Configurar las herramientas del backoffice de usuarios.',
      icon: '🔧',
      href: '/admin/herramientas',
      color: '#4a90e2'
    },
    {
      title: 'Mensajes de Contacto',
      description: 'Ver y gestionar los mensajes recibidos desde el formulario.',
      icon: '📧',
      href: '/admin/contactos',
      color: '#f39c12'
    },
    {
      title: 'Especialistas',
      description: 'Administrar los especialistas que aparecen en la tabla del home.',
      icon: '⭐',
      href: '/admin/especialistas',
      color: '#0f3460'
    },
    {
      title: 'Estadísticas',
      description: 'Ver métricas y estadísticas del sitio.',
      icon: '📊',
      href: '/admin/estadisticas',
      color: '#16213e'
    },
    {
      title: 'Configuración',
      description: 'Configurar opciones del sitio.',
      icon: '⚙️',
      href: '/admin/configuracion',
      color: '#1a1a2e'
    }
  ]

  return (
    <Container style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <h1 className="text-center mb-2">Panel de Administración</h1>
      <p className="text-center mb-5" style={{ opacity: 0.7 }}>
        Gestiona tu sitio desde aquí
      </p>

      <Row className="g-4">
        {adminCards.map((card, index) => (
          <Col key={index} md={6} lg={3}>
            <Link 
              href={card.href} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                className="aside1 text-center" 
                style={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  borderLeft: `4px solid ${card.color}`
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  {card.title}
                </h3>
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                  {card.description}
                </p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <a 
          href="/" 
          style={{ color: '#fff', opacity: 0.7 }}
        >
          ← Volver al inicio
        </a>
      </div>
    </Container>
  )
}
