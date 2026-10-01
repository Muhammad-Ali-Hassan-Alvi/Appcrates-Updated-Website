import { IconSprites } from './components/icons/Icons.jsx'
import { ScrollProgress } from './components/layout/ScrollProgress.jsx'
import { Header } from './components/layout/Header.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { ChatWidget } from './components/chat/ChatWidget.jsx'
import { FabRow } from './components/layout/FabRow.jsx'
import { Hero } from './components/sections/Hero.jsx'
import { Rotator } from './components/sections/Rotator.jsx'
import { TrustMarquee } from './components/sections/TrustMarquee.jsx'
import { StaffAugmentation } from './components/sections/StaffAugmentation.jsx'
import { Portfolio } from './components/sections/Portfolio.jsx'
import { Services } from './components/sections/Services.jsx'
import { ToolsApproach } from './components/sections/ToolsApproach.jsx'
import { Team } from './components/sections/Team.jsx'
import { GlobalPresence } from './components/sections/GlobalPresence.jsx'
import { Testimonials } from './components/sections/Testimonials.jsx'
import { FAQ } from './components/sections/FAQ.jsx'
import { Contact } from './components/sections/Contact.jsx'
import { useTheme } from './hooks/useTheme.js'

export default function App() {
  useTheme()

  return (
    <>
      <IconSprites />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Rotator />
        <TrustMarquee />
        <StaffAugmentation />
        <Portfolio />
        <Services />
        <ToolsApproach />
        <Team />
        <GlobalPresence />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FabRow />
      <ChatWidget />
    </>
  )
}
