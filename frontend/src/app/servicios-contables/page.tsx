'use client'

import { useAOS } from '@/hooks/useAOS'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

const servicios = [
  {
    titulo: 'Balance General',
    descripcion: 'Elaboración de estados contables anuales conforme a normativas vigentes.',
    icono: '📊'
  },
  {
    titulo: 'Liquidación de Impuestos',
    descripcion: 'Cálculo y presentación de declaraciones juradas de IVA, Ganancias y otros.',
    icono: '💰'
  },
  {
    titulo: 'Registraciones Contables',
    descripcion: 'Registro sistematizado de operaciones comerciales y financieras.',
    icono: '📝'
  },
  {
    titulo: 'Balances Trimestrales',
    descripcion: 'Estados contables periódicos para seguimiento de gestión.',
    icono: '📈'
  },
  {
    titulo: 'Certificaciones',
    descripcion: 'Certificaciones contables para trámites bancarios y comerciales.',
    icono: '✅'
  },
  {
    titulo: 'Auditorías',
    descripcion: 'Revisión y verificación de estados contables y procedimientos.',
    icono: '🔍'
  }
]

export default function ServiciosContablesPage() {
  useAOS()

  return (
    <>
      <Navigation />

      <section className="hero-section" style={{ paddingTop: '8rem' }} data-aos="fade-up">
        <Container>
          <h1 data-aos="fade-up" data-aos-delay="100">
            Servicios Contables
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Soluciones contables integrales para tu empresa
          </p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="services-grid">
            {servicios.map((servicio, index) => (
              <div 
                key={index} 
                className="service-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="service-icon">{servicio.icono}</div>
                <h3>{servicio.titulo}</h3>
                <p>{servicio.descripcion}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-light">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }} data-aos="fade-up">
            <h2 style={{ marginBottom: '1rem' }}>¿Necesitás un servicio personalizado?</h2>
            <p style={{ marginBottom: '1.5rem', color: '#6c757d' }}>
              Contactanos para una consulta gratuita y te asesoramos sobre la mejor solución para tu empresa.
            </p>
            <Link href="/contacto" className="btn-cta" style={{ background: '#1e3a5f', color: 'white' }}>
              Contactanos
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}

import { Container } from 'react-bootstrap'
