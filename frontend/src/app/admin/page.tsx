'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

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
      color: '#1e3a5f'
    },
    {
      title: 'Herramientas Digitales',
      description: 'Configurar las herramientas del backoffice de usuarios.',
      icon: '🔧',
      href: '/admin/herramientas',
      color: '#2d5a87'
    },
    {
      title: 'Mensajes de Contacto',
      description: 'Ver y gestionar los mensajes recibidos desde el formulario.',
      icon: '📧',
      href: '/admin/contactos',
      color: '#4a90e2'
    },
    {
      title: 'Especialistas',
      description: 'Administrar los especialistas que aparecen en la tabla del home.',
      icon: '⭐',
      href: '/admin/especialistas',
      color: '#50c878'
    },
    {
      title: 'Estadísticas',
      description: 'Ver métricas y estadísticas del sitio.',
      icon: '📊',
      href: '/admin/estadisticas',
      color: '#f39c12'
    },
    {
      title: 'Configuración',
      description: 'Configurar opciones del sitio.',
      icon: '⚙️',
      href: '/admin/configuracion',
      color: '#6c757d'
    }
  ]

  return (
    <Container style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <h1 className="text-center mb-2" style={{ color: '#1e3a5f' }}>Panel de Administración</h1>
      <p className="text-center mb-5" style={{ color: '#6c757d' }}>
        Gestiona tu sitio desde aquí
      </p>

      <Row className="g-4">
        {adminCards.map((card, index) => (
          <Col key={index} md={6} lg={4}>
            <Link 
              href={card.href} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card 
                className="h-100 admin-card" 
                style={{ 
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  borderTop: `4px solid ${card.color}`
                }}
              >
                <Card.Body className="text-center p-4">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e3a5f' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: '#6c757d', fontSize: '0.9rem', margin: 0 }}>
                    {card.description}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <a href="/" className="back-btn">
          ← Volver al inicio
        </a>
      </div>

      <style jsx>{`
        .admin-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #1e3a5f;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .back-btn:hover {
          background: #f8f9fa;
          color: #1e3a5f;
          transform: translateX(-4px);
        }
        .back-btn::before {
          content: '←';
          transition: transform 0.2s ease;
        }
        .back-btn:hover::before {
          transform: translateX(-4px);
        }
      `}</style>
    </Container>
  )
}
