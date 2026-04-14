import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import About from './components/About';
import Services from './components/Services';
import Marquee from './components/Marquee';
import Process from './components/Process';
import Gallery from './components/Gallery';
import ParallaxQuote from './components/ParallaxQuote';
import Testimonials from './components/Testimonials';
import CtaBanner from './components/CtaBanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useAnchorScroll } from './hooks/useAnchorScroll';

export default function App() {
  useAnchorScroll();

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <Marquee />
        <Process />
        <Gallery />
        <ParallaxQuote />
        <Testimonials />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
