'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import axios from '@/lib/axios'
import toast from 'react-hot-toast'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

interface Specialist {
  _id: string
  area: string
  name: string
  description?: string
  order: number
  active: boolean
}

export default function AdminEspecialistasPage() {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const router = useRouter()
  const [specialists, setSpecialists] = useState<Specialist[]>([])
  const [loadingSpecialists, setLoadingSpecialists] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingSpecialist, setEditingSpecialist] = useState<Specialist | null>(null)
  const [formData, setFormData] = useState({
    area: '',
    name: '',
    description: '',
    order: 0,
    active: true
  })

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    } else if (!loading && isAuthenticated && !isAdmin) {
      router.push('/')
    }
  }, [loading, isAuthenticated, isAdmin, router])

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchSpecialists()
    }
  }, [isAuthenticated, isAdmin])

  const fetchSpecialists = async () => {
    try {
      const response = await axios.get('/specialists')
      setSpecialists(response.data.data)
    } catch (error) {
      console.error('Error fetching specialists:', error)
    } finally {
      setLoadingSpecialists(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingSpecialist) {
        await axios.put(`/specialists/${editingSpecialist._id}`, formData)
        toast.success('Especialista actualizado')
      } else {
        await axios.post('/specialists', formData)
        toast.success('Especialista creado')
      }
      setShowModal(false)
      resetForm()
      fetchSpecialists()
    } catch {
      toast.error('Error al guardar')
    }
  }

  const handleEdit = (specialist: Specialist) => {
    setEditingSpecialist(specialist)
    setFormData({
      area: specialist.area,
      name: specialist.name,
      description: specialist.description || '',
      order: specialist.order,
      active: specialist.active
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este especialista?')) return
    
    try {
      await axios.delete(`/specialists/${id}`)
      toast.success('Especialista eliminado')
      fetchSpecialists()
    } catch {
      toast.error('Error al eliminar')
    }
  }

  const resetForm = () => {
    setFormData({
      area: '',
      name: '',
      description: '',
      order: 0,
      active: true
    })
    setEditingSpecialist(null)
  }

  const openCreateModal = () => {
    resetForm()
    setShowModal(true)
  }

  if (loading || loadingSpecialists) {
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
        <h1 style={{ color: '#1e3a5f' }}>Especialistas</h1>
        <div className="d-flex gap-3 align-items-center">
          <a href="/admin" className="back-btn">
            ← Volver al panel
          </a>
          <Button variant="primary" onClick={openCreateModal}>
            + Nuevo Especialista
          </Button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <Table hover className="mb-0">
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ color: '#1e3a5f' }}>Orden</th>
              <th style={{ color: '#1e3a5f' }}>Área</th>
              <th style={{ color: '#1e3a5f' }}>Nombre</th>
              <th style={{ color: '#1e3a5f' }}>Estado</th>
              <th style={{ color: '#1e3a5f' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {specialists.map((specialist) => (
              <tr key={specialist._id}>
                <td>{specialist.order}</td>
                <td>{specialist.area}</td>
                <td>{specialist.name}</td>
                <td>
                  <span style={{ 
                    color: specialist.active ? '#22c55e' : '#ef4444',
                    fontWeight: 'bold'
                  }}>
                    {specialist.active ? '✓ Activo' : '✗ Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleEdit(specialist)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(specialist._id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {specialists.length === 0 && (
          <p className="text-center p-4" style={{ color: '#6c757d' }}>
            No hay especialistas configurados. Crea el primero!
          </p>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSpecialist ? 'Editar Especialista' : 'Nuevo Especialista'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Área</Form.Label>
              <Form.Control
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Orden</Form.Label>
              <Form.Control
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Activo"
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
