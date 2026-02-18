'use client'

import { useAOS } from '@/hooks/useAOS'
import Navigation from '@/components/Navigation'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'

const servicios = [
  {
    titulo: 'Automatizacion de Procesos',
    descripcion: 'Digitalizacion de flujos de trabajo manuales para mayor eficiencia.',
    icono: '🤖'
  },
  {
    titulo: 'Integracion de Sistemas',
    descripcion: 'Conexion entre diferentes plataformas y software empresarial.',
    icono: '🔗'
  },
  {
    titulo: 'Facturacion Electronica',
    descripcion: 'Implementacion y configuracion de sistemas de facturacion digital.',
    icono: '📄'
  },
  {
    titulo: 'Gestion Documental',
    descripcion: 'Organizacion digital de documentos y archivos empresariales.',
    icono: '📁'
  },
  {
    titulo: 'Reportes Automaticos',
    descripcion: 'Generacion automatica de reportes e informes periodicos.',
    icono: '📊'
  },
  {
    titulo: 'Capacitacion Digital',
    descripcion: 'Formacion en herramientas digitales para tu equipo.',
    icono: '👥'
  }
]

export default function AutomatizacionesPage() {
  useAOS()

  return (
    <>
      <header className="header">
        <VideoBackground />
        <Navigation />
      </header>

      <div className="container" style={{ paddingTop: '100px' }}>
        <section className="section2" data-aos="fade-up">
          <h2>Automatizaciones Digitales</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Transformacion digital para optimizar tu negocio
          </p>
        </section>

        <div className="row g-4 mb-4">
          {servicios.map((servicio, index) => (
            <div 
              key={index} 
              className="col-md-6 col-lg-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="aside1" style={{ height: '100%' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
                  {servicio.icono} {servicio.titulo}
                </h3>
                <p style={{ opacity: 0.9 }}>{servicio.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="section1" data-aos="flip-left">
          <h2>
            Ahorra tiempo y reduce errores
            <br />
            Con soluciones automatizadas a medida
          </h2>
        </section>
      </div>

      <Footer />
    </>
  )
}
