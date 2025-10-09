import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Treatment from './components/Treatment.jsx'
import Cancer from './components/Cancer.jsx'
import SeekingSupport from './components/SeekingSupport.jsx'
import DailyCare from './components/DailyCare.jsx'
import SkillsTraining from './components/SkillsTraining.jsx'
import TraditionalMedicine from './components/TraditionalMedicine.jsx'
import Nutrition from './components/Nutrition.jsx'
import PsychologicalSupport from './components/PsychologicalSupport.jsx'
import Footer from './components/Footer.jsx'
import ThemeFab from './components/ThemeFab.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/treatment" element={<Treatment />} />
          <Route path="/cancer" element={<Cancer />} />
          <Route path="/seekingSupport" element={<SeekingSupport />} />
          <Route path="/dailyCare" element={<DailyCare />} />
          <Route path="/skillsTraining" element={<SkillsTraining />} />
          <Route path="/traditionalMedicine" element={<TraditionalMedicine />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/psychologicalSupport" element={<PsychologicalSupport />} />


          <Route path="*" element={<p style={{ padding: '4rem 0' }}>Page not found 😢</p>} />
        </Routes>
      </main>
      <Footer />
      <ThemeFab /> {/* floating button */}
    </>
  )
}
