import Reveal from "./Reveal"
const pubs = [
  {
    year: 2025,
    title: 'Example A',
    authors: 'Example A',
    venue: 'Example A',
    link: '#',
    notes: 'Example A'
  },
  {
    year: 2025,
    title: 'Example B',
    authors: 'Example B',
    venue: 'Example B',
    link: '#',
    notes: 'Example B'
  }
]

export default function SeekingSupport() {
  return (
    <section className="section">
      <h1>Tìm kiếm sự hỗ trợ là điều quan trọng. Hãy xem các video bên dưới để tìm hiểu thêm...</h1>
      <Reveal dir="right" delay={1}>
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'stretch' }}>
            <div className="card" style={{ flex: 1, overflowY: 'auto', height: '25vh' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe width="450vh" height="253vh" src="https://www.youtube.com/embed/vYH4LAufLdM?si=SQLGUpez0sc0gJGv" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
            </div>

            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '25vh' }}>
            </div>
          </div>
        </div>
      </Reveal>
      <h2>Seeking Support</h2>
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '1rem', marginTop: '1rem' }}>
        {pubs.sort((a, b) => b.year - a.year).map(p => (
          <article className="card" key={p.title}>
            <h3 style={{ marginBottom: '.3rem' }}>{p.title}</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{p.authors}</p>
            <p style={{ margin: '.3rem 0', color: 'var(--muted)' }}><em>{p.venue}</em> · {p.year}</p>
            <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
              <a className="btn" href={p.link} target="_blank" rel="noreferrer">View</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
