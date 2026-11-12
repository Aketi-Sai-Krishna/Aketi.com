
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import './ProjectCard.scss';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/${project.slug}`}
      className="project-card"
      aria-label={`View case study: ${project.title}`}
    >
      <div className="project-card-image">
        <img
          src={project.coverImage}
          alt={project.coverAlt}
          loading="lazy"
        />

        <span className="project-card-number">
          {project.number}
        </span>

        <span className="project-card-open">
          <ArrowUpRight size={22} />
        </span>
      </div>

      <div className="project-card-content">
        <div className="project-card-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        <h3>{project.title}</h3>

        <p>{project.shortDescription}</p>

        <span className="project-card-link">
          View case study
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
