import './process.scss';
import { ArrowUpRight } from 'lucide-react';

const steps = [
  { number: '01', title: 'Understand the problem', text: 'We ask questions, look at the current process, and agree on what better should mean.' },
  { number: '02', title: 'Plan the right-sized solution', text: 'We define the essentials, the trade-offs, and a realistic next step before building.' },
  { number: '03', title: 'Build in clear steps', text: 'You see progress early, give feedback, and know what is happening as we go.' },
  { number: '04', title: 'Improve as you grow', text: 'After launch, we can refine the solution as your team and needs change.' },
];

export default function Process() {
  return (
    <section className="process section-shell" id="approach">
      <div className="process-intro">
        <p className="eyebrow">03 — HOW WE WORK</p>
        <h2>Clear thinking.<br /><em>No theatre.</em></h2>
        <p>Good work comes from clear conversations and useful decisions—not jargon, mystery, or a 90-slide deck.</p>
        <a className="text-link" href="#contact">Talk through your idea <ArrowUpRight size={16} /></a>
      </div>
      <div className="process-steps">
        {steps.map((step) => (
          <article className="process-step" key={step.number}>
            <span>{step.number}</span>
            <div><h3>{step.title}</h3><p>{step.text}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
