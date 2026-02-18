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
import InputGroup from 'react-bootstrap/InputGroup'

interface User {
  _id: string
  name: string
  email: string
  role: string
  provider: string
  active: boolean
  createdAt: string
}

export default function AdminUsuariosPage() {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
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
      fetchUsers()
    }
  }, [isAuthenticated, isAdmin, search])

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      
      const response = await axios.get(`/users?${params}`)
      setUsers(response.data.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoadingUsers(false)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active
    })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await axios.put(`/users/${editingUser?._id}`, formData)
      toast.success('Usuario actualizado')
      setShowModal(false)
      resetForm()
      fetchUsers()
    } catch {
      toast.error('Error al actualizar')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) return
    
    try {
      await axios.delete(`/users/${id}`)
      toast.success('Usuario eliminado')
      fetchUsers()
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al eliminar'
      toast.error(message)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user',
      active: true
    })
    setEditingUser(null)
  }

  const toggleUserStatus = async (user: User) => {
    try {
      await axios.put(`/users/${user._id}`, { active: !user.active })
      toast.success(user.active ? 'Usuario desactivado' : 'Usuario activado')
      fetchUsers()
    } catch {
      toast.error('Error al cambiar estado')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getProviderBadge = (provider: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      local: { color: '#6c757d', label: 'Email' },
      google: { color: '#4285F4', label: 'Google' },
      facebook: { color: '#1877F2', label: 'Facebook' },
      microsoft: { color: '#00a4ef', label: 'Microsoft' },
      instagram: { color: '#E1306C', label: 'Instagram' }
    }
    const badge = badges[provider] || badges.local
    return (
      <span style={{ 
        background: badge.color, 
        color: 'white', 
        padding: '2px 8px', 
        borderRadius: '10px',
        fontSize: '0.75rem'
      }}>
        {badge.label}
      </span>
    )
  }

  if (loading || loadingUsers) {
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
        <h1>Gestión de Usuarios</h1>
        <a 
          href="/admin" 
          style={{ color: '#fff', opacity: 0.7 }}
        >
          ← Volver al panel
        </a>
      </div>

      <div className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Buscar usuarios por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-dark text-white border-secondary"
          />
          <Button variant="secondary" onClick={fetchUsers}>
            🔍 Buscar
          </Button>
        </InputGroup>
      </div>

      <div className="section2">
        <div className="table-responsive">
          <Table striped hover className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Registro</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span>👤</span>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <span>{user.email}</span>
                      {getProviderBadge(user.provider)}
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      color: user.role === 'admin' ? '#e94560' : '#fff',
                      fontWeight: user.role === 'admin' ? 'bold' : 'normal'
                    }}>
                      {user.role === 'admin' ? '👑 Administrador' : 'Usuario'}
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {formatDate(user.createdAt)}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant={user.active ? 'success' : 'warning'}
                      onClick={() => toggleUserStatus(user)}
                    >
                      {user.active ? '✓ Activo' : '✗ Inactivo'}
                    </Button>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => handleEdit(user)}
                      >
                        ✏️ Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(user._id)}
                        disabled={user.role === 'admin'}
                      >
                        🗑️
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        
        {users.length === 0 && (
          <p className="text-center" style={{ opacity: 0.7, padding: '2rem' }}>
            No se encontraron usuarios.
          </p>
        )}
      </div>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        contentClassName="bg-dark text-white"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                disabled
                className="bg-secondary text-white border-dark"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="bg-secondary text-white border-dark"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Usuario activo"
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
