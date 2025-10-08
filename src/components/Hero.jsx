import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero">
      <h1>This is an Example Heading</h1>
      <p>There will be more content here.</p>
      <p><Link className="btn" to="/nutrition">See the nutrition page.</Link></p>
    </section>
  )
}
