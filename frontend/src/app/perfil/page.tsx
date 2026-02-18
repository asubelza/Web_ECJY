'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

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
      <div className="aside1" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">Mi Perfil</h2>
        
        <div className="styled-background mb-3">
          <p style={{ opacity: 0.7, marginBottom: '5px' }}>Nombre:</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user.name}</p>
        </div>

        <div className="styled-background mb-3">
          <p style={{ opacity: 0.7, marginBottom: '5px' }}>Email:</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user.email}</p>
        </div>

        <div className="styled-background mb-4">
          <p style={{ opacity: 0.7, marginBottom: '5px' }}>Rol:</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
          </p>
        </div>

        <div className="d-flex gap-3 justify-content-center">
          <Button 
            variant="warning"
            onClick={logout}
          >
            Cerrar Sesion
          </Button>
        </div>

        <div className="text-center mt-4">
          <a 
            href="/" 
            style={{ color: '#fff', opacity: 0.7 }}
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </Container>
  )
}
