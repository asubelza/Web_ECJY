'use client'

import { useAOS } from '@/hooks/useAOS'
import Navigation from '@/components/Navigation'
import VideoBackground from '@/components/VideoBackground'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function ContactoPage() {
  useAOS()

  return (
    <>
      <header className="header">
        <VideoBackground />
        <Navigation />
      </header>

      <div className="container" style={{ paddingTop: '100px' }}>
        <section className="section2" data-aos="fade-up">
          <h2>Contactanos</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Completa el formulario y te responderemos a la brevedad.
          </p>
          <ContactForm />
        </section>
      </div>

      <Footer />
    </>
  )
}
