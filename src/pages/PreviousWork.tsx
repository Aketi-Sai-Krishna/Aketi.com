
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import './PreviousWork.scss';

export default function PreviousWork() {
  return (
    <main className="previous-work section-shell">
      <section className="previous-work-hero">
        <p className="eyebrow">02 — SELECTED WORK</p>

        <div className="previous-work-heading">
          <h1>
            Real problems.
            <br />
            <em>Thoughtful solutions.</em>
          </h1>

          <p>
            A selection of projects where we turned business
            challenges into useful digital experiences.
          </p>
        </div>

        <div className="previous-work-bottom">
          <span>SELECTED PROJECTS</span>

          <span>
            {String(projects.length).padStart(2, '0')} PROJECTS
          </span>

          <a href="#project-list" aria-label="Explore projects">
            Explore work <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <section
        className="previous-work-grid-section"
        id="project-list"
      >
        <div className="previous-work-grid-heading">
          <p className="eyebrow">THE WORK</p>
          <p>Ideas made useful, one project at a time.</p>
        </div>

        <div className="previous-work-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>
      </section>

      <section className="previous-work-cta">
        <p className="eyebrow">HAVE SOMETHING IN MIND?</p>

        <h2>
          Your challenge
          <br />
          <em>could be next.</em>
        </h2>

        <p>
          Tell us what you're trying to solve.
          Let's explore what we can build together.
        </p>

        <Link
          to="/#contact"
          className="previous-work-cta-link"
        >
          Let's talk about your project
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
