
// import './Services.scss';
// import {
//   ArrowUpRight,
//   Bot,
//   Database,
//   Gauge,
//   LayoutDashboard,
//   Workflow,
//   Wrench,
// } from 'lucide-react';

// const services = [
//   {
//     number: '01',
//     icon: LayoutDashboard,
//     title: 'Websites & Digital Platforms',
//     description:
//       'Clear, accessible digital experiences that communicate your value and help customers take the next step.',
//     href: '/services/websites-digital-platforms',
//   },
//   {
//     number: '02',
//     icon: Database,
//     title: 'Dashboards & Business Systems',
//     description:
//       'Turn scattered business information into useful dashboards and connected systems that support better decisions.',
//     href: '/services/dashboards-business-systems',
//   },
//   {
//     number: '03',
//     icon: Workflow,
//     title: 'Workflow Automation',
//     description:
//       'Connect the tools your team already uses and reduce repetitive tasks through smarter, reliable workflows.',
//     href: '/services/workflow-automation',
//   },
// ];

// export default function Services() {
//   return (
//     <section className="services section-shell" id="services">
//       <div className="section-heading">
//         <div>
//           <p className="eyebrow">02 — WHAT WE DO</p>
//           <h2>
//             Explore what we offer
//           </h2>
//         </div>

//         <p className="section-intro">
//           Different Problems Require Different Solutions. We Choose the Most Effective Approach to Deliver Results Efficiently.
//         </p>
//       </div>

//       <div className="service-grid">
//         {services.map(({ number, icon: Icon, title, description, href }) => (
//           <article className="service-card" key={number}>
//             <div className="service-card-top">
//               <span>{number}</span>
//               <Icon size={22} strokeWidth={1.6} />
//             </div>

//             <h3>{title}</h3>
//             <p>{description}</p>

//             <a href={href} aria-label={`Explore ${title}`}>
//               Explore service <ArrowUpRight size={16} />
//             </a>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }



import './Services.scss';
import {
  ArrowUpRight,
  Database,
  LayoutDashboard,
  Workflow,
} from 'lucide-react';

const services = [
  {
    number: '01',
    icon: LayoutDashboard,
    title: 'Websites & Digital Platforms',
    description:
      'Clear, accessible digital experiences that communicate your value and help customers take the next step.',
    href: '/services/websites-digital-platforms',
  },
  {
    number: '02',
    icon: Database,
    title: 'Dashboards & Business Systems',
    description:
      'Turn scattered business information into useful dashboards and connected systems that support better decisions.',
    href: '/services/dashboards-business-systems',
  },
  {
    number: '03',
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'Connect the tools your team already uses and reduce repetitive tasks through smarter, reliable workflows.',
    href: '/services/workflow-automation',
  },
];

export default function Services() {
  return (
    <section className="services section-shell" id="services">

      <div className="section-heading">
        <div>
          <p className="eyebrow">02 — WHAT WE DO</p>
          <h2>Explore what we offer</h2>
        </div>

        <p className="section-intro">
          Different problems require different solutions.
          We choose the most effective approach to deliver
          results efficiently.
        </p>
      </div>

      <div className="service-grid">
        {services.map(({ number, icon: Icon, title, description, href }) => (
          <article className="service-card" key={number}>

            <div className="service-card-top">
              <span>{number}</span>
              <Icon size={24} strokeWidth={1.5} />
            </div>

            <h3>{title}</h3>

            <p>{description}</p>

            <a href={href} aria-label={`Explore ${title}`}>
              Explore service
              <ArrowUpRight size={16} />
            </a>

          </article>
        ))}
      </div>

    </section>
  );
}
