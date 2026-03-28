'use client'

import { useAOS } from '@/hooks/useAOS'
import Navigation from '@/components/Navigation'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { Container } from 'react-bootstrap'

export default function ContactoPage() {
  useAOS()

  return (
    <>
      <Navigation />

      <section className="hero-section" style={{ paddingTop: '8rem' }} data-aos="fade-up">
        <Container>
          <h1 data-aos="fade-up" data-aos-delay="100">
            Contacto
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Completá el formulario y te responderemos a la brevedad
          </p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="styled-background" data-aos="fade-up">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
