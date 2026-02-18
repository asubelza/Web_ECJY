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
        <h1>Especialistas</h1>
        <div className="d-flex gap-3 align-items-center">
          <a 
            href="/admin" 
            style={{ color: '#fff', opacity: 0.7 }}
          >
            ← Volver al panel
          </a>
          <Button variant="secondary" onClick={openCreateModal}>
            + Nuevo Especialista
          </Button>
        </div>
      </div>

      <div className="section2">
        <div className="table-responsive">
          <Table striped hover className="table">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Area</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Acciones</th>
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
                      color: specialist.active ? '#4ade80' : '#f87171',
                      fontWeight: 'bold'
                    }}>
                      {specialist.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => handleEdit(specialist)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
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
        </div>
      </div>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        contentClassName="bg-dark text-white"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>
            {editingSpecialist ? 'Editar Especialista' : 'Nuevo Especialista'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
                className="bg-secondary text-white border-dark"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-secondary text-white border-dark"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripcion (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-secondary text-white border-dark"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Orden</Form.Label>
              <Form.Control
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="bg-secondary text-white border-dark"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
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
    </Container>
  )
}
