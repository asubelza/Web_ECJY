'use client'

import { useAOS } from '@/hooks/useAOS'
import Navigation from '@/components/Navigation'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'

const servicios = [
  {
    titulo: 'Planificacion Financiera',
    descripcion: 'Desarrollo de estrategias financieras para optimizar recursos y maximizar resultados.',
    icono: '🎯'
  },
  {
    titulo: 'Analisis de Rentabilidad',
    descripcion: 'Evaluacion de margenes, costos y puntos de equilibrio de tu negocio.',
    icono: '📊'
  },
  {
    titulo: 'Gestion de Flujo de Caja',
    descripcion: 'Control y proyeccion de movimientos financieros a corto y mediano plazo.',
    icono: '💵'
  },
  {
    titulo: 'Asesoramiento en Inversiones',
    descripcion: 'Orientacion en decisiones de inversion y financiamiento empresarial.',
    icono: '📈'
  },
  {
    titulo: 'Presupuestos y Proyecciones',
    descripcion: 'Elaboracion de presupuestos operativos y proyecciones financieras.',
    icono: '📋'
  },
  {
    titulo: 'Analisis de Riesgo',
    descripcion: 'Identificacion y evaluacion de riesgos financieros en tu operacion.',
    icono: '⚠️'
  }
]

export default function AsesoriaEconomicaPage() {
  useAOS()

  return (
    <>
      <header className="header">
        <VideoBackground />
        <Navigation />
      </header>

      <div className="container" style={{ paddingTop: '100px' }}>
        <section className="section2" data-aos="fade-up">
          <h2>Asesoria Economica y Financiera</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Estrategias financieras para el crecimiento de tu empresa
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
            Potencia la rentabilidad de tu negocio
            <br />
            Con nuestra asesoria especializada
          </h2>
        </section>
      </div>

      <Footer />
    </>
  )
}
