
import { useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
} from 'lucide-react';

import getProjectBySlug  from '../data/projects';
import './ProjectDetail.scss';

export default function ProjectDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const previousPage = location.state?.from;

    if (previousPage) {
      navigate(previousPage);
    } else {
      navigate('/previous-work');
    }
  };
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [activeStep, setActiveStep] = useState(0);

  if (!project) {
    return (
      <main className="project-not-found section-shell">
        <p className="eyebrow">PROJECT NOT FOUND</p>
        <h1>Looks like this project has moved.</h1>
        <Link to="/previous-work">
          <ArrowLeft size={17} /> Back to previous work
        </Link>
      </main>
    );
  }

  return (
    <main className="project-detail section-shell">
      {/* 01 — Project hero */}
      <section className="project-detail-hero">
          <button
            type="button"
            onClick={handleBack}
            className="project-back-link"
          >
            <ArrowLeft size={15} />
            Back to selected work
          </button>

            <p className="eyebrow">
              {project.number} — {project.category}
            </p>

            <h1>{project.title}</h1>

            <p className="project-detail-description">
              {project.description}
            </p>

            <div className="project-meta">
              <div>
                <span>CLIENT</span>
                <strong>{project.client}</strong>
              </div>
              <div>
                <span>YEAR</span>
                <strong>{project.year}</strong>
              </div>
              <div>
                <span>CATEGORY</span>
                <strong>{project.category}</strong>
              </div>
              <div>
                <span>SERVICES</span>
                <strong>{project.services.join(' · ')}</strong>
              </div>
            </div>

            <div className="project-hero-image">
              <img
                src={project.coverImage}
                alt={project.coverAlt}
              />
            </div>
      </section>

      {/* 02 — Problem statement */}

      <section className="project-problem">
        <div className="project-section-label">
          <p className="eyebrow">01 — THE PROBLEM</p>
          {/* <span>THE PROBLEM</span> */}
        </div>

        <div className="project-problem-content">
          <h2>{project.problemTitle}</h2>
          <p>{project.problemDescription}</p>

          <div className="project-challenges">
            {project.challenges.map((challenge, index) => (
              <div className="project-challenge" key={challenge}>
                <span>0{index + 1}</span>
                <p>{challenge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Our solution */}

      <section className="project-solution">
        <div className="project-solution-heading">
          <p className="eyebrow">02 — OUR APPROACH</p>
          <h2>
            From challenge <em> to solution </em>
          </h2>
          <p>
            Every solution starts with understanding the problem.
            Here is how we approached this project, one step at a time.
          </p>
        </div>

        <div className="project-story">

          {/* Sticky image */}

          <div className="project-story-visual">
            <div className="project-story-image">
              {project.process.map((step, index) => (
                <img
                  key={step.step}
                  src={step.image}
                  alt={step.imageAlt}
                  className={activeStep === index ? 'active' : ''}
                  loading="lazy"
                />
              ))}
            </div>

            <div className="project-story-image-caption">
              <span>OUR PROCESS</span>
              <span>
                {project.process[activeStep]?.step} / 04
              </span>
            </div>
          </div>

          {/* Scrolling steps */}

          <div className="project-story-steps">
            {project.process.map((step, index) => (
              <article
                className={`project-story-step ${
                  activeStep === index ? 'active' : ''
                }`}
                key={step.step}
                onMouseEnter={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
              >
                <span className="project-step-number">
                  {step.step}
                </span>

                <div>
                  <p className="project-step-label">
                    STEP {step.step}
                  </p>
                  <h3>{step.title}</h3>
                  <p className="project-step-description">
                    {step.description}
                  </p>
                </div>

                <ArrowUpRight
                  className="project-step-arrow"
                  size={19}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Final result */}

      <section className="project-result">
        <p className="eyebrow">03 — THE OUTCOME</p>

        <h2>{project.resultTitle}</h2>

        <p className="project-result-description">
          {project.resultDescription}
        </p>

        <div className="project-result-list">
          {project.results.map((result) => (
            <div key={result}>
              <Check size={17} />
              <span>{result}</span>
            </div>
          ))}
        </div>

        <div className="project-gallery">
          {project.gallery.map((item) => (
            <figure key={item.image}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 05 — CTA */}

      <section className="project-detail-cta">
        <p className="eyebrow">HAVE A SIMILAR CHALLENGE?</p>

        <h2>
          Your business
          <br />
          <em>could be next.</em>
        </h2>

        <p>
          Let's explore how we can build a solution
          that works for your business.
        </p>

        <Link to="/#contact" className="project-cta-button">
          Let's talk about your project
          <ArrowUpRight size={18} />
        </Link>

        <Link to="/previous-work" className="project-next-link">
          <ArrowLeft size={15} />
          Explore more projects
        </Link>
      </section>
    </main>
  );
}
