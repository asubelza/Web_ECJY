'use client'

import { useAOS } from '@/hooks/useAOS'
import Navigation from '@/components/Navigation'
import VideoBackground from '@/components/VideoBackground'
import SpecialistsTable from '@/components/SpecialistsTable'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function HomePage() {
  useAOS()

  return (
    <>
      <header className="header">
        <VideoBackground />
        <Navigation />
      </header>

      <main className="main" data-aos="zoom-in">
        <div className="container">
          <Image
            className="img"
            src="/images/inmobiliaria-negocios.jpg"
            alt="Imagen de productos"
            width={1200}
            height={600}
            priority
          />
        </div>
      </main>

      <div className="container">
        <aside 
          className="aside1" 
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <h2>
            Servicios contables, financieros y tecnologicos para que sigas enfocado en hacer crecer tu pyme
          </h2>
        </aside>

        <aside 
          className="aside2"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <h2>
            ¿Estas en busca de delegar la contabilidad de tu negocio? ¡Buena decision!
            Nos sumamos a tu equipo, asi logras tranquilidad y seguis abocado a otras tareas.
            ¿Que te parece?
          </h2>
        </aside>

        <section className="section2" data-aos="fade-up">
          <h2>Especialistas</h2>
          <SpecialistsTable />
        </section>

        <section 
          className="section1"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <h2>
            ¿Que esta pasando? ¿Que hay de nuevo?
            <br />
            ¿Como puedo potenciar mi negocio?
          </h2>
        </section>
      </div>

      <Footer />
    </>
  )
}
