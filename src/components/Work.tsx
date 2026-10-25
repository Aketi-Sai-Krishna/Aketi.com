import './work.scss';
import { ArrowUpRight } from 'lucide-react';
import projects from '../data/projects';

export default function Work() {
  return (
        <section className="work section-shell" id="work">
          <div className="section-heading">
            <div><p className="eyebrow">01 — SELECTED WORK</p><h2>Real problems.<br/><em>Useful</em> builds.</h2></div>
            <p className="section-intro">We don’t build software to tick a trend box. We build it because something can work better.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className={`project-visual ${project.visual}`}>
                  <span className="project-number">{project.number} / CASE STUDY</span>
                  {project.visual === 'fitness' ? (
                    <div className="mini-dashboard">
                      <div className="mini-top"><b>IFITNESS CLUB</b><span>MEMBER OVERVIEW ↗</span></div>
                      <div className="mini-metrics"><div><small>ACTIVE MEMBERS</small><strong>248</strong><i>↑ Members managed</i></div><div><small>RENEWALS DUE</small><strong>12</strong><i>Follow-up made easier</i></div></div>
                      <div className="mini-bars"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
                    </div>
                  ) : (
                    <div className="stock-card"><span>STOCK / OVERVIEW</span><strong>Know what’s<br/>moving.</strong><div className="stock-lines"><i/><i/><i/></div><small>CONCEPT DIRECTION — NOT A CLIENT PROJECT</small></div>
                  )}
                </div>
                <div className="project-details">
                  <div className="project-title-row"><div><span className="project-type">{project.type}</span><h3>{project.name}</h3></div><span className="project-arrow"><ArrowUpRight/></span></div>
                  <div className="project-story"><div><span>THE PROBLEM</span><p>{project.problem}</p></div><div><span>THE SOLUTION</span><p>{project.solution}</p></div></div>
                  <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>
  );
}
