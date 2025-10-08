import { projects } from './projects-data.js'

function ProjectCard({ p }) {
  return (
    <article className="card">
      <h3>{p.title}</h3>
      <p>{p.description}</p>
      <div style={{display:'flex', gap:'.5rem', flexWrap:'wrap', marginTop:'0.6rem'}}>
        {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
      </div>
      <p style={{marginTop:'1rem'}}><a href={p.link} target="_blank" rel="noreferrer">View project →</a></p>
    </article>
  )
}

export default function DailyCare() {
  return (
    <section className="section">
      <h2>Daily Care</h2>
      <div className="grid" style={{marginTop:'1rem'}}>
        {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>
    </section>
  )
}
