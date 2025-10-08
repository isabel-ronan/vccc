const posts = [
  {
    title: 'Example A',
    date: '2025-01-01',
    summary: 'Description of Example A.',
    slug: 'example-a'
  },
  {
    title: 'Example B',
    date: '2025-01-01',
    summary: 'Description of Example B.',
    slug: 'example-b'
  }
]

export default function TraditionalMedicine() {
  return (
    <section className="section">
      <h2>Traditional Medicine</h2>
      <div className="grid" style={{marginTop:'1rem'}}>
        {posts.map(post => (
          <article className="card" key={post.slug}>
            <h3>{post.title}</h3>
            <p style={{color:'var(--muted)'}}>{new Date(post.date).toLocaleDateString()}</p>
            <p>{post.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
