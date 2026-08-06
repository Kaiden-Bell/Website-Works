export default function Hero() {
  return (
    <header className="hero">
      <h1 className="hero-title layer-back">SILVERS</h1>
      <div className="hero-video-container collage-piece">
        <iframe
          src="https://www.youtube.com/embed/kXaGLlRHh60?autoplay=1&mute=1&loop=1&playlist=kXaGLlRHh60&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="OLIVE TREE - Silvers Edit"
        />
        <span className="video-label">OLIVE TREE (PLAYING)</span>
      </div>
      <p className="hero-accent layer-front">THE CUT IS EVERYTHING</p>
    </header>
  )
}
