'use client'

import { useEffect, useRef } from 'react'

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <div>
      <video 
        ref={videoRef}
        className="background-video" 
        preload="auto" 
        loop 
        autoPlay 
        muted
        aria-label="Video de fondo mostrando una oficina."
      >
        <source src="/videos/Oficina.mp4" type="video/mp4" />
        OFICINA
      </video>
    </div>
  )
}
