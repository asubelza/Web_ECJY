'use client'

import Image from 'next/image'

const socialLinks = [
  { 
    name: 'Facebook', 
    url: 'https://www.facebook.com/contable.jy', 
    icon: '/images/facebook.avif' 
  },
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com', 
    icon: '/images/INST.png' 
  },
  { 
    name: 'WhatsApp', 
    url: 'https://wa.me/+5491121729306', 
    icon: '/images/Whatsapp.png' 
  },
  { 
    name: 'TikTok', 
    url: 'https://www.tiktok.com', 
    icon: '/images/TIKTOK.png' 
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <h2>
        <strong>
          Contactanos en nuestras Redes Sociales.-
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Image
                src={link.icon}
                alt={link.name}
                width={35}
                height={35}
                className="icono"
              />
            </a>
          ))}
        </strong>
      </h2>
    </footer>
  )
}
