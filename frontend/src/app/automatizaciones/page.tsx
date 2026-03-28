'use client'

import { useAOS } from '@/hooks/useAOS'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Container } from 'react-bootstrap'

const servicios = [
  {
    titulo: 'Automatización de Procesos',
    descripcion: 'Digitalización de flujos de trabajo manuales para mayor eficiencia.',
    icono: '🤖'
  },
  {
    titulo: 'Integración de Sistemas',
    descripcion: 'Conexión entre diferentes plataformas y software empresarial.',
    icono: '🔗'
  },
  {
    titulo: 'Facturación Electrónica',
    descripcion: 'Implementación y configuración de sistemas de facturación digital.',
    icono: '📄'
  },
  {
    titulo: 'Gestión Documental',
    descripcion: 'Organización digital de documentos y archivos empresariales.',
    icono: '📁'
  },
  {
    titulo: 'Reportes Automáticos',
    descripcion: 'Generación automática de reportes e informes periódicos.',
    icono: '📊'
  },
  {
    titulo: 'Capacitación Digital',
    descripcion: 'Formación en herramientas digitales para tu equipo.',
    icono: '👥'
  }
]

export default function AutomatizacionesPage() {
  useAOS()

  return (
    <>
      <Navigation />

      <section className="hero-section" style={{ paddingTop: '8rem' }} data-aos="fade-up">
        <Container>
          <h1 data-aos="fade-up" data-aos-delay="100">
            Automatizaciones Digitales
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Transformación digital para optimizar tu negocio
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
            <h2 style={{ marginBottom: '1rem' }}>Ahorrá tiempo y reducí errores</h2>
            <p style={{ marginBottom: '1.5rem', color: '#6c757d' }}>
              Con soluciones automatizadas a medida para tu empresa
            </p>
            <Link href="/contacto" className="btn-cta" style={{ background: '#1e3a5f', color: 'white' }}>
              Conocer Más
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
