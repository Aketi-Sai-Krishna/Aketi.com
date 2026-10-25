import '../styles/home.scss';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Work from '../components/Work';
import Process from '../components/Process';
import Approach from '../components/Approach';
import Testimonials from '../components/Testimonials';
import Insights from '../components/Insights';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Approach />
        <Testimonials />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
