import Hero from '../components/hero/Hero'
import WhoIAm from '../components/sections/WhoIAm'
import SelectedWorks from '../components/sections/SelectedWorks'
import WhatIDo from '../components/sections/WhatIDo'
import Testimonials from '../components/sections/Testimonials'

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoIAm />
      <SelectedWorks />
      <WhatIDo />
      <Testimonials />
    </main>
  )
}
