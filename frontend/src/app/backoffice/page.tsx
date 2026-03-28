'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import axios from '@/lib/axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

interface Tool {
  _id: string
  name: string
  description: string
  category: string
  url: string
  icon: string
  color: string
  isExternal: boolean
  active: boolean
}

interface Stats {
  totalUsers: number
  totalContacts: number
  pendingContacts: number
  totalSpecialists: number
}

export default function BackofficePage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [tools, setTools] = useState<Tool[]>([])
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [loading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchTools()
      fetchStats()
    }
  }, [isAuthenticated])

  const fetchTools = async () => {
    try {
      const response = await axios.get('/tools')
      setTools(response.data.data)
    } catch (error) {
      console.error('Error fetching tools:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await axios.get('/users/stats')
      setStats(response.data.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  if (loading) {
    return (
      <Container className="text-center" style={{ paddingTop: '150px' }}>
        <p>Cargando...</p>
      </Container>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const categories = [
    { key: 'contabilidad', label: 'Contabilidad', icon: '📊' },
    { key: 'impuestos', label: 'Impuestos', icon: '💰' },
    { key: 'nomina', label: 'Nómina', icon: '👥' },
    { key: 'facturacion', label: 'Facturación', icon: '📄' },
    { key: 'reportes', label: 'Reportes', icon: '📈' },
    { key: 'otro', label: 'Otros', icon: '🔧' }
  ]

  const getToolsByCategory = (category: string) => {
    return tools.filter(tool => tool.category === category && tool.active)
  }

  return (
    <>
      <Container style={{ paddingTop: '120px', paddingBottom: '50px' }}>
        <h1 className="text-center mb-2" style={{ color: '#1e3a5f' }}>Mi Backoffice</h1>
        <p className="text-center mb-5" style={{ color: '#6c757d' }}>
          Accede a tus herramientas y gestiona tu información
        </p>

        {stats && (
          <Row className="mb-5 g-4">
            <Col md={3}>
              <Card className="text-center h-100" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Card.Body>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
                  <h2 style={{ color: '#1e3a5f', margin: 0 }}>{stats.totalUsers}</h2>
                  <p style={{ color: '#6c757d', margin: 0 }}>Usuarios</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center h-100" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Card.Body>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📧</div>
                  <h2 style={{ color: '#1e3a5f', margin: 0 }}>{stats.totalContacts}</h2>
                  <p style={{ color: '#6c757d', margin: 0 }}>Mensajes</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center h-100" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Card.Body>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏰</div>
                  <h2 style={{ color: '#1e3a5f', margin: 0 }}>{stats.pendingContacts}</h2>
                  <p style={{ color: '#6c757d', margin: 0 }}>Pendientes</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center h-100" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Card.Body>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                  <h2 style={{ color: '#1e3a5f', margin: 0 }}>{stats.totalSpecialists}</h2>
                  <p style={{ color: '#6c757d', margin: 0 }}>Especialistas</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {categories.map((category) => {
          const categoryTools = getToolsByCategory(category.key)
          if (categoryTools.length === 0) return null

          return (
            <div key={category.key} className="mb-5">
              <h3 className="mb-3" style={{ color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '0.5rem' }}>
                {category.icon} {category.label}
              </h3>
              <Row className="g-4">
                {categoryTools.map((tool) => (
                  <Col key={tool._id} md={4}>
                    <Card 
                      style={{ 
                        background: '#ffffff',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        height: '100%',
                        transition: 'all 0.3s ease'
                      }}
                      className="tool-card"
                      onClick={() => {
                        if (tool.url) {
                          if (tool.isExternal) {
                            window.open(tool.url, '_blank')
                          } else {
                            router.push(tool.url)
                          }
                        }
                      }}
                    >
                      <Card.Body className="text-center">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                          {tool.icon}
                        </div>
                        <Card.Title style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1e3a5f' }}>
                          {tool.name}
                        </Card.Title>
                        {tool.description && (
                          <Card.Text style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                            {tool.description}
                          </Card.Text>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )
        })}

        {tools.length === 0 && (
          <div className="text-center p-5" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
            <h3>🔧</h3>
            <p style={{ color: '#6c757d' }}>
              No hay herramientas configuradas todavía.
            </p>
            <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
              Un administrador puede agregar herramientas desde el panel de admin.
            </p>
          </div>
        )}

        <div className="text-center mt-5">
          <a href="/" style={{ color: '#1e3a5f' }}>
            ← Volver al inicio
          </a>
        </div>
      </Container>

      <style jsx>{`
        .tool-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
        }
      `}</style>
    </>
  )
}
