'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
    <Container style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <h1 className="text-center mb-2">Mi Backoffice</h1>
      <p className="text-center mb-5" style={{ opacity: 0.7 }}>
        Accede a tus herramientas y gestiona tu información
      </p>

      {/* Estadísticas */}
      {stats && (
        <Row className="mb-5">
          <Col md={3}>
            <Card className="text-center" style={{ background: '#0f3460', border: 'none' }}>
              <Card.Body>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
                <h2>{stats.totalUsers}</h2>
                <p style={{ opacity: 0.7, margin: 0 }}>Usuarios</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center" style={{ background: '#16213e', border: 'none' }}>
              <Card.Body>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📧</div>
                <h2>{stats.totalContacts}</h2>
                <p style={{ opacity: 0.7, margin: 0 }}>Mensajes</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center" style={{ background: '#e94560', border: 'none' }}>
              <Card.Body>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏰</div>
                <h2>{stats.pendingContacts}</h2>
                <p style={{ opacity: 0.7, margin: 0 }}>Pendientes</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center" style={{ background: '#1a1a2e', border: 'none' }}>
              <Card.Body>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                <h2>{stats.totalSpecialists}</h2>
                <p style={{ opacity: 0.7, margin: 0 }}>Especialistas</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Herramientas por categoría */}
      {categories.map((category) => {
        const categoryTools = getToolsByCategory(category.key)
        if (categoryTools.length === 0) return null

        return (
          <div key={category.key} className="mb-5">
            <h3 className="mb-3" style={{ borderBottom: '2px solid #e94560', paddingBottom: '0.5rem' }}>
              {category.icon} {category.label}
            </h3>
            <Row className="g-4">
              {categoryTools.map((tool) => (
                <Col key={tool._id} md={4}>
                  <Card 
                    style={{ 
                      background: tool.color, 
                      border: 'none', 
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      height: '100%'
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
                      <Card.Title style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        {tool.name}
                      </Card.Title>
                      {tool.description && (
                        <Card.Text style={{ opacity: 0.8, fontSize: '0.9rem' }}>
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

      {/* Si no hay herramientas */}
      {tools.length === 0 && (
        <div className="aside1 text-center">
          <h3>🔧</h3>
          <p style={{ opacity: 0.8 }}>
            No hay herramientas configuradas todavía.
          </p>
          <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>
            Un administrador puede agregar herramientas desde el panel de admin.
          </p>
        </div>
      )}

      <div className="text-center mt-5">
        <a href="/" style={{ color: '#fff', opacity: 0.7 }}>
          ← Volver al inicio
        </a>
      </div>

      <style jsx>{`
        .tool-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </Container>
  )
}
