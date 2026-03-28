'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import SocialLoginButtons from '@/components/SocialLoginButtons'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const success = await login(email, password)
    if (success) {
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Card style={{ width: '100%', maxWidth: '400px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-2" style={{ color: '#1e3a5f' }}>Iniciar Sesión</h2>
          <p className="text-center mb-4" style={{ color: '#6c757d' }}>
            Acceso opcional para gestionar tu cuenta
          </p>
          
          <SocialLoginButtons />
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 500 }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: 500 }}>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button 
                type="submit" 
                variant="primary"
                disabled={loading}
                size="lg"
                style={{ background: '#1e3a5f', border: 'none' }}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </div>
          </Form>

          <div className="text-center mt-4">
            <p style={{ color: '#6c757d' }}>
              ¿No tienes cuenta?{' '}
              <Link href="/registro" style={{ color: '#1e3a5f', fontWeight: 500 }}>
                Regístrate aquí
              </Link>
            </p>
          </div>

          <div className="text-center mt-3">
            <Link href="/" style={{ color: '#1e3a5f' }}>
              ← Volver al inicio
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
