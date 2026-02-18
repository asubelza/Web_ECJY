'use client'

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Table from 'react-bootstrap/Table'

interface Specialist {
  _id: string
  area: string
  name: string
}

export default function SpecialistsTable() {
  const [specialists, setSpecialists] = useState<Specialist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await axios.get('/specialists')
        setSpecialists(response.data.data)
      } catch (error) {
        console.error('Error fetching specialists:', error)
        setSpecialists([
          { _id: '1', area: 'Contable', name: 'Contadora Yanina Elba Fernandez' },
          { _id: '2', area: 'Contable', name: 'Contador Joel Jave Mendoza' },
          { _id: '3', area: 'Automatización', name: 'Alfonso Waldemar Subelza' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchSpecialists()
  }, [])

  if (loading) {
    return <p>Cargando especialistas...</p>
  }

  return (
    <Table striped hover className="table">
      <thead>
        <tr>
          <th>Area</th>
          <th>Especialista</th>
        </tr>
      </thead>
      <tbody>
        {specialists.map((specialist) => (
          <tr key={specialist._id}>
            <td>{specialist.area}</td>
            <td>{specialist.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
