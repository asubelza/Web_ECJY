'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import axios from '@/lib/axios'
import toast from 'react-hot-toast'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
  message: string
  status: 'pending' | 'read' | 'replied'
  createdAt: string
}

export default function AdminContactosPage() {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loadingContacts, setLoadingContacts] = useState(true)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    } else if (!loading && isAuthenticated && !isAdmin) {
      router.push('/')
    }
  }, [loading, isAuthenticated, isAdmin, router])

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchContacts()
    }
  }, [isAuthenticated, isAdmin])

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/contact')
      setContacts(response.data.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoadingContacts(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/contact/${id}`, { status })
      toast.success('Estado actualizado')
      fetchContacts()
    } catch {
      toast.error('Error al actualizar')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge bg="warning" style={{ color: '#000' }}>Pendiente</Badge>
      case 'read':
        return <Badge bg="info">Leído</Badge>
      case 'replied':
        return <Badge bg="success">Respondido</Badge>
      default:
        return <Badge bg="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading || loadingContacts) {
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
        <h1 style={{ color: '#1e3a5f' }}>Mensajes de Contacto</h1>
        <a href="/admin" className="back-btn">
          ← Volver al panel
        </a>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center p-5" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ color: '#6c757d' }}>No hay mensajes de contacto todavía.</p>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <Table hover className="mb-0">
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th style={{ color: '#1e3a5f' }}>Fecha</th>
                <th style={{ color: '#1e3a5f' }}>Nombre</th>
                <th style={{ color: '#1e3a5f' }}>Email</th>
                <th style={{ color: '#1e3a5f' }}>Mensaje</th>
                <th style={{ color: '#1e3a5f' }}>Estado</th>
                <th style={{ color: '#1e3a5f' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', color: '#6c757d' }}>
                    {formatDate(contact.createdAt)}
                  </td>
                  <td>{contact.name}</td>
                  <td>
                    <a href={`mailto:${contact.email}`} style={{ color: '#1e3a5f' }}>
                      {contact.email}
                    </a>
                  </td>
                  <td style={{ maxWidth: '200px' }}>
                    <div style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: '#6c757d'
                    }}>
                      {contact.message}
                    </div>
                  </td>
                  <td>{getStatusBadge(contact.status)}</td>
                  <td>
                    <div className="d-flex gap-1 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => updateStatus(contact._id, 'read')}
                        disabled={contact.status === 'read'}
                      >
                        Leído
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-success"
                        onClick={() => updateStatus(contact._id, 'replied')}
                        disabled={contact.status === 'replied'}
                      >
                        Respondido
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

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
