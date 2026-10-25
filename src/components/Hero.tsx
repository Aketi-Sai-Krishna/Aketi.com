
import './hero.scss';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import OrbitVisual from './OrbitVisual';

export default function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-grid">
        {/* Hero content */}
        <div className="hero-copy">
          <div><p className="eyebrow">WHO WE ARE</p></div>
          <h1 className="hero-title">
            <span>Your ideas, Our expertise</span>
          </h1>
          <h2 className="hero-subtitle"> To Simplify Your Business</h2>
          <p className="hero-description">
            From scattered challenges to connected solutions, we turn your complex business problems into smart digital experiences that help your business move forward.
          </p>
          {/* Hero actions */}
          <div className="hero-actions">
            <a className="button button-cream" href="#contact">
              <span>Let's Talk About the Problem</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>

            <a className="showreel-link" href="#work">
                
              {/* <span className="play-button" aria-hidden="true">
                ↘
              </span> */}
              <span>Our Previous Work's</span>
                 <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Hero visual */}
        <div className="hero-art">
          <OrbitVisual />

          {/* <div className="art-sticker" aria-label="Less busywork">
            <span className="sticker-symbol" aria-hidden="true">
              ✳
            </span>
            <span>LESS</span>
            <span>BUSYWORK</span>
          </div> */}
        </div>
      </div>

      {/* Scrolling services ticker */}
      <div className="ticker" aria-label="AKETI services">
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 2 }).map((_, index) => (
            <span className="ticker-group" key={index}>
              WEBSITE DEVELOPMENT <b>✳</b>
              CUSTOM BUSINESS SOFTWARE <b>✳</b>
              DASHBOARDS & ANALYTICS <b>✳</b>
              WORKFLOW AUTOMATION <b>✳</b>
              AI-POWERED SOLUTIONS <b>✳</b>
              SYSTEM INTEGRATION <b>✳</b>
              DIGITAL TRANSFORMATION <b>✳</b>
              UI/UX DESIGN <b>✳</b>
              BUSINESS PROCESS OPTIMIZATION <b>✳</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
