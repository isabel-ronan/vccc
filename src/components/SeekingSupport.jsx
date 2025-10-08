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
      <h2>Seeking Support</h2>
      <div className="grid" style={{gridTemplateColumns:'1fr', gap:'1rem', marginTop:'1rem'}}>
        {pubs.sort((a,b)=>b.year-a.year).map(p => (
          <article className="card" key={p.title}>
            <h3 style={{marginBottom:'.3rem'}}>{p.title}</h3>
            <p style={{margin:0, color:'var(--muted)'}}>{p.authors}</p>
            <p style={{margin:'.3rem 0', color:'var(--muted)'}}><em>{p.venue}</em> · {p.year}</p>
            <div style={{display:'flex', gap:'.5rem', alignItems:'center'}}>
              <a className="btn" href={p.link} target="_blank" rel="noreferrer">View</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
