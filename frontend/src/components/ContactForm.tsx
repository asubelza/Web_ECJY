'use client'

import { useState, FormEvent } from 'react'
import axios from '@/lib/axios'
import toast from 'react-hot-toast'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post('/contact', formData)
      toast.success('Consulta enviada correctamente!')
      setFormData({ name: '', email: '', message: '', phone: '' })
    } catch {
      toast.error('Error al enviar la consulta. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Form onSubmit={handleSubmit} id="contact_form">
      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
          Nombre y Apellido
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={1}
          id="user_name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Tu nombre completo"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
          Correo Electrónico
        </Form.Label>
        <Form.Control
          type="email"
          id="user_email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
          Teléfono (opcional)
        </Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+54 11 1234-5678"
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
          Tu Consulta
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Escribinos tu consulta y te responderemos a la brevedad..."
          required
        />
      </Form.Group>

      <div className="d-flex gap-3 justify-content-center">
        <Button 
          type="submit" 
          className="btn-primary px-4"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Consulta'}
        </Button>
      </div>
    </Form>
  )
}
