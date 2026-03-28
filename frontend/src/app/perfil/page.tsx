'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export default function PerfilPage() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return (
      <Container className="text-center" style={{ paddingTop: '150px' }}>
        <p>Cargando...</p>
      </Container>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <Container style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <Card style={{ maxWidth: '600px', margin: '0 auto', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4" style={{ color: '#1e3a5f' }}>Mi Perfil</h2>
          
          <Card className="mb-3" style={{ background: '#f8f9fa', border: 'none' }}>
            <Card.Body>
              <p style={{ color: '#6c757d', marginBottom: '5px', fontSize: '0.9rem' }}>Nombre</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0, color: '#1e3a5f' }}>{user.name}</p>
            </Card.Body>
          </Card>

          <Card className="mb-3" style={{ background: '#f8f9fa', border: 'none' }}>
            <Card.Body>
              <p style={{ color: '#6c757d', marginBottom: '5px', fontSize: '0.9rem' }}>Email</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0, color: '#1e3a5f' }}>{user.email}</p>
            </Card.Body>
          </Card>

          <Card className="mb-4" style={{ background: '#f8f9fa', border: 'none' }}>
            <Card.Body>
              <p style={{ color: '#6c757d', marginBottom: '5px', fontSize: '0.9rem' }}>Rol</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0, color: '#1e3a5f' }}>
                {user.role === 'admin' ? '👑 Administrador' : 'Usuario'}
              </p>
            </Card.Body>
          </Card>

          <div className="d-flex gap-3 justify-content-center">
            <Button 
              variant="outline-primary"
              onClick={logout}
              style={{ borderColor: '#1e3a5f', color: '#1e3a5f' }}
            >
              Cerrar Sesión
            </Button>
          </div>

          <div className="text-center mt-4">
            <a href="/" style={{ color: '#1e3a5f' }}>
              ← Volver al inicio
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
