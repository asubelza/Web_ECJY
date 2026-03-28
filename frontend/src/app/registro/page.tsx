'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

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
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <Card style={{ width: '100%', maxWidth: '400px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <Card.Body className="p-4">
            <h2 className="text-center mb-2" style={{ color: '#1e3a5f' }}>Crear Cuenta</h2>
            <p className="text-center mb-4" style={{ color: '#6c757d' }}>
              Registro opcional para acceder a funciones adicionales
            </p>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 500 }}>Nombre completo</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                />
              </Form.Group>

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

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 500 }}>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: 500 }}>Confirmar contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu contraseña"
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
                  {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
              </div>
            </Form>

            <div className="text-center mt-4">
              <p style={{ color: '#6c757d' }}>
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" style={{ color: '#1e3a5f', fontWeight: 500 }}>
                  Inicia sesión aquí
                </Link>
              </p>
            </div>

            <div className="text-center mt-3">
              <Link href="/" className="back-btn">
                ← Volver al inicio
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
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
    </>
  )
}
