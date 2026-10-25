import './services.scss';
import { ArrowUpRight, Bot, Database, Gauge, LayoutDashboard, Workflow, Wrench } from 'lucide-react';

const services = [
  { number: '01', icon: LayoutDashboard, title: 'Websites & digital platforms', description: 'Clear, accessible experiences that explain what you do and make the next step obvious.' },
  { number: '02', icon: Database, title: 'Dashboards & business systems', description: 'Bring scattered information into one useful place so your team can see what is happening.' },
  { number: '03', icon: Workflow, title: 'Workflow automation', description: 'Connect the tools you already use and remove repetitive copy-paste work.' },
  { number: '04', icon: Bot, title: 'Practical AI solutions', description: 'Use AI where it genuinely helps: search, knowledge assistants, and repetitive tasks.' },
  { number: '05', icon: Gauge, title: 'Performance & UX improvements', description: 'Make existing products easier to use, faster to load, and simpler to maintain.' },
  { number: '06', icon: Wrench, title: 'Ongoing support', description: 'Get thoughtful improvements after launch instead of being left with a handover folder.' },
];

export default function Services() {
  return (
    <section className="services section-shell" id="services">
      <div className="section-heading">
        <div><p className="eyebrow">02 — WHAT WE DO</p><h2>Useful by design.<br /><em>Built for work.</em></h2></div>
        <p className="section-intro">Different problems need different tools. We choose the simplest approach that gets the job done properly.</p>
      </div>
      <div className="service-grid">
        {services.map(({ number, icon: Icon, title, description }) => (
          <article className="service-card" key={number}>
            <div className="service-card-top"><span>{number}</span><Icon size={22} strokeWidth={1.6} /></div>
            <h3>{title}</h3>
            <p>{description}</p>
            <a href="#contact" aria-label={`Ask about ${title}`}>Discuss this <ArrowUpRight size={16} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
