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
  '#0f3460', '#16213e', '#1a1a2e', '#e94560',
  '#4a90e2', '#50c878', '#f39c12', '#9b59b6'
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
    color: '#0f3460',
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
      color: '#0f3460',
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
        <h1>Herramientas Digitales</h1>
        <div className="d-flex gap-3 align-items-center">
          <a 
            href="/admin" 
            style={{ color: '#fff', opacity: 0.7 }}
          >
            ← Volver al panel
          </a>
          <Button variant="secondary" onClick={openCreateModal}>
            + Nueva Herramienta
          </Button>
        </div>
      </div>

      <div className="section2">
        <Table striped hover className="table">
          <thead>
            <tr>
              <th>Orden</th>
              <th>Icono</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>URL</th>
              <th>Estado</th>
              <th>Acciones</th>
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
                    <small style={{ opacity: 0.7 }}>{tool.description}</small>
                  )}
                </td>
                <td>{getCategoryLabel(tool.category)}</td>
                <td>
                  {tool.url ? (
                    <span style={{ color: tool.isExternal ? '#e94560' : '#4a90e2' }}>
                      {tool.isExternal ? '🔗 Externo' : '📄 Interno'}
                    </span>
                  ) : (
                    <span style={{ opacity: 0.5 }}>Sin URL</span>
                  )}
                </td>
                <td>
                  <span style={{ 
                    color: tool.active ? '#50c878' : '#f87171',
                    fontWeight: 'bold'
                  }}>
                    {tool.active ? '✓ Activo' : '✗ Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => handleEdit(tool)}
                    >
                      ✏️
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(tool._id)}
                    >
                      🗑️
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {tools.length === 0 && (
          <p className="text-center" style={{ opacity: 0.7, padding: '2rem' }}>
            No hay herramientas configuradas. Crea la primera!
          </p>
        )}
      </div>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        contentClassName="bg-dark text-white"
        size="lg"
      >
        <Modal.Header closeButton closeVariant="white">
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
                    className="bg-secondary text-white border-dark"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-secondary text-white border-dark"
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
                className="bg-secondary text-white border-dark"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://herramienta.com o /ruta-interna"
                className="bg-secondary text-white border-dark"
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
                        variant={formData.icon === icon ? 'primary' : 'secondary'}
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
                        variant={formData.color === color ? 'light' : 'secondary'}
                        size="sm"
                        onClick={() => setFormData({ ...formData, color })}
                        style={{ 
                          background: color, 
                          border: formData.color === color ? '3px solid white' : 'none',
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
                    className="bg-secondary text-white border-dark"
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
    </Container>
  )
}
