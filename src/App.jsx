import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ServiceTimes from './components/ServiceTimes'
import Events from './components/Events'
import Sermons from './components/Sermons'
import Ministries from './components/Ministries'
import Give from './components/Give'
import Contact from './components/Contact'
import ThemeSettings from './components/ThemeSettings'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ServiceTimes />
        <Events />
        <Sermons />
        <Ministries />
        <Give />
        <Contact />
      </main>
      <Footer />
      <ThemeSettings />
    </ThemeProvider>
  )
}

export default App
