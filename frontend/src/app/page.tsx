'use client'

import { useAOS } from '@/hooks/useAOS'
import Navigation from '@/components/Navigation'
import SpecialistsTable from '@/components/SpecialistsTable'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function HomePage() {
  useAOS()

  return (
    <>
      <Navigation />

      <section className="hero-section" data-aos="fade-up">
        <Container>
          <h1 data-aos="fade-up" data-aos-delay="100">
            Servicios contables, financieros y tecnológicos
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Acompañamos a las PyMEs en su crecimiento con asesoramiento integral y soluciones personalizadas.
          </p>
          <Link href="/contacto" className="btn-cta" data-aos="fade-up" data-aos-delay="300">
            Contactanos
          </Link>
        </Container>
      </section>

      <section className="section">
        <Container>
          <h2 data-aos="fade-up">Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card" data-aos="fade-up" data-aos-delay="100">
              <div className="service-icon">📊</div>
              <h3>Servicios Contables</h3>
              <p>
                Liquidación de impuestos, asesoramiento impositivo y cumplimiento de obligaciones tributarias para empresas.
              </p>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="200">
              <div className="service-icon">💰</div>
              <h3>Asesoría Económica</h3>
              <p>
                Planificación financiera, análisis de costos y estrategias para optimizar recursos y maximizar resultados.
              </p>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="300">
              <div className="service-icon">⚡</div>
              <h3>Automatizaciones</h3>
              <p>
                Herramientas digitales para optimizar procesos, reducir tiempos y mejorar la eficiencia de tu negocio.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section-light">
        <Container>
          <h2 data-aos="fade-up">¿Por qué elegirnos?</h2>
          <div className="services-grid">
            <div className="service-card" data-aos="fade-up" data-aos-delay="100">
              <h3>Experiencia</h3>
              <p>
                Más de 15 años acompañando a empresas en su desarrollo y crecimiento.
              </p>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="200">
              <h3>Equipo Profesional</h3>
              <p>
                Profesionales especializados en las áreas contable, impositiva y laboral.
              </p>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="300">
              <h3>Tecnología</h3>
              <p>
                Utilizamos herramientas modernas para brindarte soluciones eficientes y actualizadas.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <h2 data-aos="fade-up">Nuestro Equipo</h2>
          <div className="specialists-section" data-aos="fade-up">
            <SpecialistsTable />
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
