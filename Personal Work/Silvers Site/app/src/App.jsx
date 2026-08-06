import NoiseOverlay from './components/NoiseOverlay'
import DeconstructedNav from './components/DeconstructedNav'
import Hero from './components/Hero'
import TornDivider from './components/TornDivider'
import FeaturedWork from './components/FeaturedWork'
import Statement from './components/Statement'
import FinalCTA from './components/FinalCTA'

function App() {
  return (
    <>
      <NoiseOverlay />
      <DeconstructedNav />
      <Hero />
      <TornDivider variant={1} />
      <FeaturedWork />
      <TornDivider variant={2} />
      <Statement />
      <TornDivider variant={3} />
      <FinalCTA />
    </>
  )
}

export default App
