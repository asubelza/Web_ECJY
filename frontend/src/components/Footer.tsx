'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from 'react-bootstrap'

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/contable.jy', icon: '/images/facebook.avif' },
  { name: 'Instagram', url: 'https://www.instagram.com', icon: '/images/INST.png' },
  { name: 'WhatsApp', url: 'https://wa.me/+5491121729306', icon: '/images/Whatsapp.png' },
  { name: 'TikTok', url: 'https://www.tiktok.com', icon: '/images/TIKTOK.png' },
]

export default function Footer() {
  return (
    <footer className="footer-sbs">
      <Container>
        <div className="footer-content">
          <div>
            <h3>Estudio JY</h3>
            <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1rem' }}>
              Servicios contables, financieros y tecnológicos para hacer crecer tu PyME.
            </p>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <Image src={link.icon} alt={link.name} width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3>Servicios</h3>
            <ul>
              <li><Link href="/servicios-contables">Servicios Contables</Link></li>
              <li><Link href="/asesoria-economica">Asesoría Económica</Link></li>
              <li><Link href="/automatizaciones">Automatizaciones</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3>Contacto</h3>
            <div className="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="https://wa.me/+5491121729306" style={{ color: 'inherit' }}>+54 11 2172-9306</a>
            </div>
            <div className="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:contacto@estudiocontablejy.com.ar" style={{ color: 'inherit' }}>contacto@estudiocontablejy.com.ar</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Estudio Contable JY. Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  )
}
