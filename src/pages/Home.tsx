// import '../styles/home.scss';
// import Navbar from '../components/Navbar';
// import Hero from '../components/Hero';
// import Services from '../components/Services';
// import Work from '../components/Work';
// import Process from '../components/Process';
// import Approach from '../components/Approach';
// import Testimonials from '../components/Testimonials';
// import Insights from '../components/Insights';
// import Contact from '../components/Contact';
// import Footer from '../components/Footer';

// export default function Home() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <Hero />
//         <Services />
//         <Work />
//         <Process />
//         {/* <Approach /> */}
//         {/* <Testimonials /> */}
//         {/* <Insights /> */}
//         <Contact />
//       </main>
//       <Footer />
//     </>
//   );
// }


import '../styles/home.scss';
import { useEffect } from 'react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Work from '../components/Work';
import Process from '../components/Process';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {


    useEffect(() => {
      const hash = window.location.hash;

      if (!hash) return;

      const sectionId = hash.slice(1);

      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        });
      });
    }, []);


  useEffect(() => {
    const sectionIds = [
      'home',
      'services',
      'work',
      'process',
      'contact',
    ];


    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(
        (section): section is HTMLElement =>
          section !== null
      );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          const activeId = visibleSections[0].target.id;

          if (window.location.hash !== `#${activeId}`) {
            window.history.replaceState(
              null,
              '',
              `/#${activeId}`
            );
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
    
