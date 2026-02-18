'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

export default function RegistroPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    
    const success = await register(name, email, password)
    if (success) {
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="aside1">
          <h2 className="text-center mb-4">Crear Cuenta</h2>
          <p className="text-center mb-4" style={{ opacity: 0.8 }}>
            Registro opcional para acceder a funciones adicionales
          </p>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 styled-background">
              <Form.Label>
                <strong>Nombre completo:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </Form.Group>

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

            <Form.Group className="mb-3 styled-background">
              <Form.Label>
                <strong>Contraseña:</strong>
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4 styled-background">
              <Form.Label>
                <strong>Confirmar contraseña:</strong>
              </Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
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
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </div>
          </Form>

          <div className="text-center mt-4">
            <p style={{ opacity: 0.8 }}>
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" style={{ color: '#e94560', textDecoration: 'underline' }}>
                Inicia sesión aquí
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
