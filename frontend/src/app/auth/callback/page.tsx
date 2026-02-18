'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function AuthCallbackPage() {
  const router = useRouter()
  const { login: authLogin } = useAuth()

  useEffect(() => {
    const handleCallback = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        const userData = urlParams.get('user')

        if (token && userData) {
          // Guardar token
          localStorage.setItem('token', token)
          
          // Parsear datos del usuario
          const user = JSON.parse(decodeURIComponent(userData))
          
          // Redirigir al inicio
          router.push('/')
          
          // Recargar para actualizar el estado de autenticación
          window.location.reload()
        } else {
          router.push('/login?error=oauth_failed')
        }
      } catch {
        router.push('/login?error=oauth_failed')
      }
    }

    handleCallback()
  }, [router, authLogin])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a2e'
    }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h2>Procesando autenticación...</h2>
        <p style={{ opacity: 0.7 }}>Por favor espera un momento</p>
      </div>
    </div>
  )
}
