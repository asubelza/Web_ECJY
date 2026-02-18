'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'next/image'

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <Navbar 
      expand="lg" 
      className={`color_nav ${scrolled ? 'scrolled' : ''}`}
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} href="/">
          <Image
            src="/images/favicon.ico"
            alt="Logo"
            width={50}
            height={50}
            className="logoSize"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/" active={isActive('/')}>
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              href="/servicios-contables" 
              active={isActive('/servicios-contables')}
            >
              Servicios contables
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              href="/asesoria-economica" 
              active={isActive('/asesoria-economica')}
            >
              Asesoria Economica y Financiera
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              href="/automatizaciones" 
              active={isActive('/automatizaciones')}
            >
              Automatizaciones digitales
            </Nav.Link>
            <NavDropdown title="Contacto" id="contact-dropdown">
              <NavDropdown.Item 
                href="https://wa.me/+5491121729306" 
                target="_blank"
              >
                Telefono
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/contacto">
                Mail
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="https://www.facebook.com/contable.jy" 
                target="_blank"
              >
                Redes Sociales
              </NavDropdown.Item>
            </NavDropdown>

            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} href="/backoffice" active={isActive('/backoffice')}>
                  Mi Backoffice
                </Nav.Link>
                <NavDropdown 
                  title={
                    <span>
                      <span style={{ marginRight: '5px' }}>👤</span>
                      {user?.name?.split(' ')[0]}
                    </span>
                  } 
                  id="user-dropdown"
                >
                  <NavDropdown.Item as={Link} href="/perfil">
                    Mi Perfil
                  </NavDropdown.Item>
                  {isAdmin && (
                    <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} href="/admin">
                        Panel Admin
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} href="/admin/usuarios">
                        Usuarios
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} href="/admin/contactos">
                        Mensajes
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} href="/admin/herramientas">
                        Herramientas
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} href="/admin/especialistas">
                        Especialistas
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    Cerrar Sesion
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} href="/login" active={isActive('/login')}>
                  Iniciar Sesion
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  href="/registro" 
                  active={isActive('/registro')}
                  style={{ 
                    background: '#e94560',
                    borderRadius: '5px',
                    marginLeft: '5px'
                  }}
                >
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
