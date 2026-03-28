'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import axios from '@/lib/axios'
import toast from 'react-hot-toast'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

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
  order: number
}

const categories = [
  { key: 'contabilidad', label: 'Contabilidad', icon: '📊' },
  { key: 'impuestos', label: 'Impuestos', icon: '💰' },
  { key: 'nomina', label: 'Nómina', icon: '👥' },
  { key: 'facturacion', label: 'Facturación', icon: '📄' },
  { key: 'reportes', label: 'Reportes', icon: '📈' },
  { key: 'otro', label: 'Otros', icon: '🔧' }
]

const defaultIcons = ['📊', '💰', '👥', '📄', '📈', '🔧', '⚙️', '📋', '📑', '💼', '🏦', '🧾']

const defaultColors = [
  '#1e3a5f', '#2d5a87', '#4a90e2', '#50c878',
  '#f39c12', '#9b59b6', '#e94560', '#6c757d'
]

export default function AdminHerramientasPage() {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const router = useRouter()
  const [tools, setTools] = useState<Tool[]>([])
  const [loadingTools, setLoadingTools] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'otro',
    url: '',
    icon: '🔧',
    color: '#1e3a5f',
    isExternal: false,
    order: 0,
    active: true
  })

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    } else if (!loading && isAuthenticated && !isAdmin) {
      router.push('/backoffice')
    }
  }, [loading, isAuthenticated, isAdmin, router])

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchTools()
    }
  }, [isAuthenticated, isAdmin])

  const fetchTools = async () => {
    try {
      const response = await axios.get('/tools')
      setTools(response.data.data)
    } catch (error) {
      console.error('Error fetching tools:', error)
    } finally {
      setLoadingTools(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingTool) {
        await axios.put(`/tools/${editingTool._id}`, formData)
        toast.success('Herramienta actualizada')
      } else {
        await axios.post('/tools', formData)
        toast.success('Herramienta creada')
      }
      setShowModal(false)
      resetForm()
      fetchTools()
    } catch {
      toast.error('Error al guardar')
    }
  }

  const handleEdit = (tool: Tool) => {
    setEditingTool(tool)
    setFormData({
      name: tool.name,
      description: tool.description || '',
      category: tool.category,
      url: tool.url || '',
      icon: tool.icon,
      color: tool.color,
      isExternal: tool.isExternal,
      order: tool.order,
      active: tool.active
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta herramienta?')) return
    
    try {
      await axios.delete(`/tools/${id}`)
      toast.success('Herramienta eliminada')
      fetchTools()
    } catch {
      toast.error('Error al eliminar')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'otro',
      url: '',
      icon: '🔧',
      color: '#1e3a5f',
      isExternal: false,
      order: 0,
      active: true
    })
    setEditingTool(null)
  }

  const openCreateModal = () => {
    resetForm()
    setShowModal(true)
  }

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.key === category)?.label || category
  }

  if (loading || loadingTools) {
    return (
      <Container className="text-center" style={{ paddingTop: '150px' }}>
        <p>Cargando...</p>
      </Container>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <Container style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#1e3a5f' }}>Herramientas Digitales</h1>
        <div className="d-flex gap-3 align-items-center">
          <a href="/admin" className="back-btn">
            ← Volver al panel
          </a>
          <Button variant="primary" onClick={openCreateModal}>
            + Nueva Herramienta
          </Button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <Table hover className="mb-0">
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ color: '#1e3a5f' }}>Orden</th>
              <th style={{ color: '#1e3a5f' }}>Icono</th>
              <th style={{ color: '#1e3a5f' }}>Nombre</th>
              <th style={{ color: '#1e3a5f' }}>Categoría</th>
              <th style={{ color: '#1e3a5f' }}>URL</th>
              <th style={{ color: '#1e3a5f' }}>Estado</th>
              <th style={{ color: '#1e3a5f' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr key={tool._id}>
                <td>{tool.order}</td>
                <td style={{ fontSize: '1.5rem' }}>{tool.icon}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div 
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        background: tool.color, 
                        borderRadius: '4px' 
                      }} 
                    />
                    <strong>{tool.name}</strong>
                  </div>
                  {tool.description && (
                    <small style={{ color: '#6c757d' }}>{tool.description}</small>
                  )}
                </td>
                <td>{getCategoryLabel(tool.category)}</td>
                <td>
                  {tool.url ? (
                    <span style={{ color: tool.isExternal ? '#1e3a5f' : '#2d5a87' }}>
                      {tool.isExternal ? '🔗 Externo' : '📄 Interno'}
                    </span>
                  ) : (
                    <span style={{ color: '#6c757d' }}>Sin URL</span>
                  )}
                </td>
                <td>
                  <span style={{ 
                    color: tool.active ? '#22c55e' : '#ef4444',
                    fontWeight: 'bold'
                  }}>
                    {tool.active ? '✓ Activo' : '✗ Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleEdit(tool)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(tool._id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {tools.length === 0 && (
          <p className="text-center p-4" style={{ color: '#6c757d' }}>
            No hay herramientas configuradas. Crea la primera!
          </p>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTool ? 'Editar Herramienta' : 'Nueva Herramienta'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nombre de la herramienta"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat.key} value={cat.key}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Breve descripción de la herramienta"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://herramienta.com o /ruta-interna"
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Icono</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {defaultIcons.map(icon => (
                      <Button
                        key={icon}
                        variant={formData.icon === icon ? 'primary' : 'outline-secondary'}
                        size="sm"
                        onClick={() => setFormData({ ...formData, icon })}
                        style={{ fontSize: '1.2rem' }}
                      >
                        {icon}
                      </Button>
                    ))}
                  </div>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {defaultColors.map(color => (
                      <Button
                        key={color}
                        variant="light"
                        size="sm"
                        onClick={() => setFormData({ ...formData, color })}
                        style={{ 
                          background: color, 
                          border: formData.color === color ? '3px solid #1e3a5f' : '1px solid #ddd',
                          width: '30px',
                          height: '30px',
                          padding: 0
                        }}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Orden</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Es enlace externo (se abre en nueva pestaña)"
                checked={formData.isExternal}
                onChange={(e) => setFormData({ ...formData, isExternal: e.target.checked })}
              />
              <Form.Check
                type="switch"
                label="Herramienta activa"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <style jsx>{`
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
      `}</style>
    </Container>
  )
}
