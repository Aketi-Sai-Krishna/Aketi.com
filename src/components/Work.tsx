
import './work.scss';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Work() {
  return (
    <section className="work section-shell" id="work">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 — SELECTED WORK</p>
          <h2>
            Real problems.
            <br />
            <em>Useful</em> builds.
          </h2>
        </div>

        <p className="section-intro">
          We don’t build software to tick a trend box.
          We build it because something can work better.
        </p>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <Link
            to={`/${project.slug}`}
            state={{ from: '/#work' }}
            className="project-card"
            key={project.slug}
          >
            <div className="project-visual fitness">
              <span className="project-number">
                {project.number} / CASE STUDY
              </span>

              <div className="mini-dashboard">
                <div className="mini-top">
                  <b>{project.client}</b>
                  <span>MEMBER OVERVIEW ↗</span>
                </div>

                <div className="mini-metrics">
                  <div>
                    <small>ACTIVE MEMBERS</small>
                    <strong>248</strong>
                    <i>Membership overview</i>
                  </div>

                  <div>
                    <small>RENEWALS DUE</small>
                    <strong>12</strong>
                    <i>Payment tracking</i>
                  </div>
                </div>

                <div className="mini-bars">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span key={index} />
                  ))}
                </div>
              </div>
            </div>

            <div className="project-details">
              <div className="project-title-row">
                <div>
                  <span className="project-type">
                    {project.category}
                  </span>

                  <h3>{project.title}</h3>
                </div>

                <span className="project-arrow">
                  <ArrowUpRight />
                </span>
              </div>

              <p className="project-description">
                {project.shortDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
