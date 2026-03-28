'use client'

import { Component, ReactNode } from 'react'
import Button from 'react-bootstrap/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          padding: '2rem',
          textAlign: 'center',
          color: 'white',
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Algo salió mal</h2>
          <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
            {this.state.error?.message || 'Ha ocurrido un error inesperado'}
          </p>
          <Button 
            variant="primary"
            onClick={this.handleRetry}
          >
            Reintentar
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
