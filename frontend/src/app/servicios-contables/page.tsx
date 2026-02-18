'use client'

import { useAOS } from '@/hooks/useAOS'
import Navigation from '@/components/Navigation'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'
import Image from 'next/image'

const servicios = [
  {
    titulo: 'Balance General',
    descripcion: 'Elaboracion de estados contables anuales conforme a normativas vigentes.',
    icono: '📊'
  },
  {
    titulo: 'Liquidacion de Impuestos',
    descripcion: 'Calculo y presentacion de declaraciones juradas de IVA, Ganancias y otros.',
    icono: '💰'
  },
  {
    titulo: 'Registraciones Contables',
    descripcion: 'Registro sistematizado de operaciones comerciales y financieras.',
    icono: '📝'
  },
  {
    titulo: 'Balances Trimestrales',
    descripcion: 'Estados contables periodicos para seguimiento de gestion.',
    icono: '📈'
  },
  {
    titulo: 'Certificaciones',
    descripcion: 'Certificaciones contables para tramites bancarios y comerciales.',
    icono: '✅'
  },
  {
    titulo: 'Auditorias',
    descripcion: 'Revision y verificacion de estados contables y procedimientos.',
    icono: '🔍'
  }
]

export default function ServiciosContablesPage() {
  useAOS()

  return (
    <>
      <header className="header">
        <VideoBackground />
        <Navigation />
      </header>

      <div className="container" style={{ paddingTop: '100px' }}>
        <section className="section2" data-aos="fade-up">
          <h2>Servicios Contables</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Soluciones contables integrales para tu empresa
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
            ¿Necesitas un servicio personalizado?
            <br />
            Contactanos para una consulta gratuita
          </h2>
        </section>
      </div>

      <Footer />
    </>
  )
}
