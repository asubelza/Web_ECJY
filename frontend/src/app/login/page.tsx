'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import SocialLoginButtons from '@/components/SocialLoginButtons'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

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
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="aside1">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <p className="text-center mb-4" style={{ opacity: 0.8 }}>
            Acceso opcional para gestionar tu cuenta
          </p>
          
          <SocialLoginButtons />
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 styled-background">
              <Form.Label>
                <strong>Email:</strong>
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4 styled-background">
              <Form.Label>
                <strong>Contraseña:</strong>
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                type="submit" 
                variant="secondary"
                disabled={loading}
                size="lg"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </div>
          </Form>

          <div className="text-center mt-4">
            <p style={{ opacity: 0.8 }}>
              ¿No tienes cuenta?{' '}
              <Link href="/registro" style={{ color: '#e94560', textDecoration: 'underline' }}>
                Regístrate aquí
              </Link>
            </p>
          </div>

          <div className="text-center mt-3">
            <Link href="/" style={{ color: '#fff', opacity: 0.7 }}>
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
