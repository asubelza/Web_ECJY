'use client'

import { useEffect } from 'react'

export function useAOS() {
  useEffect(() => {
    const initAOS = async () => {
      const AOS = (await import('aos')).default
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-cubic',
      })
    }
    initAOS()
  }, [])
}
