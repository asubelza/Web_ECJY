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
      <Form.Group className="mb-3 styled-background">
        <Form.Label>
          <strong>Ingrese su Apellido y Nombres:</strong>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={1}
          id="user_name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 styled-background">
        <Form.Label>
          <strong>Ingrese su direccion de mail:</strong>
        </Form.Label>
        <Form.Control
          type="email"
          id="user_email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 styled-background">
        <Form.Label>
          <strong>Telefono (opcional):</strong>
        </Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+54 9 11 1234-5678"
        />
      </Form.Group>

      <Form.Group className="mb-3 styled-background">
        <Form.Label>
          <strong>Ingrese brevemente su consulta:</strong>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button 
          type="reset" 
          variant="warning"
          onClick={() => setFormData({ name: '', email: '', message: '', phone: '' })}
        >
          Limpiar Formulario
        </Button>
        <Button 
          type="submit" 
          variant="secondary"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Consulta'}
        </Button>
      </div>
    </Form>
  )
}
