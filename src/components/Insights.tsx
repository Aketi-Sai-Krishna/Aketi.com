import './insights.scss';
import { ArrowUpRight } from 'lucide-react';

const notes = [
  { category: 'A PRACTICAL RULE', title: 'Automate the boring bits. Keep the human bits human.', text: 'Automation is useful when it removes friction—not when it adds another tool to manage.' },
  { category: 'BUILDING BETTER', title: 'A dashboard is only useful when it helps someone decide.', text: 'Good business software makes the next action clearer, not just the numbers prettier.' },
  { category: 'AI, WITH A PURPOSE', title: 'Not every problem needs AI. Some need a better workflow.', text: 'Start with the job to be done. Choose technology after the problem is understood.' },
];

export default function Insights() {
  return (
    <section className="insights section-shell" id="insights">
      <div className="section-heading">
        <div><p className="eyebrow">05 — NOTES FROM THE WORK</p><h2>Less noise.<br /><em>More useful ideas.</em></h2></div>
        <p className="section-intro">A few principles we bring to digital work. Practical beats complicated.</p>
      </div>
      <div className="insight-list">
        {notes.map((note, index) => (
          <article className="insight-card" key={note.title}>
            <span className="insight-number">0{index + 1}</span>
            <div><span className="insight-category">{note.category}</span><h3>{note.title}</h3><p>{note.text}</p></div>
            <ArrowUpRight className="insight-arrow" size={22} />
          </article>
        ))}
      </div>
    </section>
  );
}
