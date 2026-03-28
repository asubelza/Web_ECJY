'use client'

import { useAOS } from '@/hooks/useAOS'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Container } from 'react-bootstrap'

const servicios = [
  {
    titulo: 'Planificación Financiera',
    descripcion: 'Desarrollo de estrategias financieras para optimizar recursos y maximizar resultados.',
    icono: '🎯'
  },
  {
    titulo: 'Análisis de Rentabilidad',
    descripcion: 'Evaluación de márgenes, costos y puntos de equilibrio de tu negocio.',
    icono: '📊'
  },
  {
    titulo: 'Gestión de Flujo de Caja',
    descripcion: 'Control y proyección de movimientos financieros a corto y mediano plazo.',
    icono: '💵'
  },
  {
    titulo: 'Asesoramiento en Inversiones',
    descripcion: 'Orientación en decisiones de inversión y financiamiento empresarial.',
    icono: '📈'
  },
  {
    titulo: 'Presupuestos y Proyecciones',
    descripcion: 'Elaboración de presupuestos operativos y proyecciones financieras.',
    icono: '📋'
  },
  {
    titulo: 'Análisis de Riesgo',
    descripcion: 'Identificación y evaluación de riesgos financieros en tu operación.',
    icono: '⚠️'
  }
]

export default function AsesoriaEconomicaPage() {
  useAOS()

  return (
    <>
      <Navigation />

      <section className="hero-section" style={{ paddingTop: '8rem' }} data-aos="fade-up">
        <Container>
          <h1 data-aos="fade-up" data-aos-delay="100">
            Asesoría Económica y Financiera
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Estrategias financieras para el crecimiento de tu empresa
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
            <h2 style={{ marginBottom: '1rem' }}>Potenciá la rentabilidad de tu negocio</h2>
            <p style={{ marginBottom: '1.5rem', color: '#6c757d' }}>
              Con nuestra asesoría especializada para PyMEs
            </p>
            <Link href="/contacto" className="btn-cta" style={{ background: '#1e3a5f', color: 'white' }}>
              Solicitar Asesoría
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
