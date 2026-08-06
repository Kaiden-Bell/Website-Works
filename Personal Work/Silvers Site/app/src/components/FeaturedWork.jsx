const works = [
  { id: 1, title: 'OLIVE TREE', url: 'https://www.youtube.com/watch?v=kXaGLlRHh60' },
  { id: 2, title: 'NOTHING FOR FREE', url: 'https://www.youtube.com/watch?v=oVywlVSl4gw' },
  { id: 3, title: 'PAST NIGHT #PARALLELRC', url: 'https://www.youtube.com/watch?v=DbBTOAaod0M' },
]

export default function FeaturedWork() {
  return (
    <section id="work" className="featured-work">
      <h2 className="section-title text-accent">LATEST DROPS</h2>

      <div className="collage-grid">
        {works.map((work) => (
          <a
            key={work.id}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`work-card card-${work.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className={`video-placeholder placeholder-${work.id}`} />
            <h3 className="card-title">{work.title}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}
