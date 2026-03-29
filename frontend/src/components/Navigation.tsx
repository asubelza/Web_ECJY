'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function Navigation() {
  const pathname = usePathname()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <Navbar 
      expand="lg" 
      className="navbar-sbs"
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
          <img 
            src="/images/logos/Logo_Mediano.png" 
            alt="Estudio Contable JY" 
            height="45"
            className="me-2"
            style={{ objectFit: 'contain' }}
          />
          <span className="logo-text d-none d-md-inline">Estudio Contable JY</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/" active={isActive('/')}>
              Inicio
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              href="/servicios-contables" 
              active={isActive('/servicios-contables')}
            >
              Servicios
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              href="/asesoria-economica" 
              active={isActive('/asesoria-economica')}
            >
              Asesoría
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              href="/automatizaciones" 
              active={isActive('/automatizaciones')}
            >
              Automatizaciones
            </Nav.Link>
            <Nav.Link as={Link} href="/contacto" active={isActive('/contacto')}>
              Contacto
            </Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} href="/backoffice" active={isActive('/backoffice')}>
                  Mi Backoffice
                </Nav.Link>
                <NavDropdown 
                  title={user?.name?.split(' ')[0] || 'Usuario'} 
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
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} href="/login" active={isActive('/login')} className="btn-login">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} href="/registro" active={isActive('/registro')} className="btn-register">
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
