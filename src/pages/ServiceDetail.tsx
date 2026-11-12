
import '../styles/service-detail.scss';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  LayoutDashboard,
  Database,
  Workflow,
} from 'lucide-react';

const WHATSAPP_NUMBER = '919100710460';

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi AKETI, I would like to discuss a business problem.',
)}`;

const servicePages = {
  '/services/websites-digital-platforms': {
    number: '01',
    category: 'DIGITAL EXPERIENCES',
    title: 'Websites &',
    accent: 'Digital Platforms',
    intro:
      'We create thoughtful digital experiences that make your business easier to understand, easier to trust, and easier to work with.',
    statement:
      'We create thoughtful digital experiences that make your business easier to understand, easier to trust, and easier to work with. Your website should do more than look good. It should help your business move forward.',
    icon: LayoutDashboard,
    benefits: [
      {
        title: 'Business websites',
        description:
          'Modern, responsive websites that communicate your offering clearly and guide visitors towards meaningful action.',
      },
      {
        title: 'Customer-facing platforms',
        description:
          'Purpose-built digital experiences for customers, partners, and teams, designed around real business needs.',
      },
      {
        title: 'Responsive interface design',
        description:
          'Consistent, accessible experiences across desktop, tablet, and mobile devices.',
      },
      {
        title: 'API integrations',
        description:
          'Connect your interface to the data and services your business already depends on.',
      },
    ],
    deliverables: [
      'Responsive website and interface development',
      'Reusable UI components and design patterns',
      'API integration and data-driven experiences',
      'Accessibility and usability improvements',
      'Performance and cross-device testing',
    ],
    process: [
    {
        step: '01',
        title: 'Requirement Analysis',
        description:
        'Define business goals, technical requirements, project scope, and success criteria.',
    },
    {
        step: '02',
        title: 'Solution Planning',
        description:
        'Design the system architecture, user experience, workflows, and implementation strategy.',
    },
    {
        step: '03',
        title: 'UI/UX Design',
        description:
        'Create intuitive interfaces, interactive prototypes, and a consistent visual identity.',
    },
    {
        step: '04',
        title: 'Development',
        description:
        'Build scalable, secure, and high-performance applications following modern development standards.',
    },
    {
        step: '05',
        title: 'Quality Assurance',
        description:
        'Perform rigorous testing to validate functionality, security, responsiveness, and reliability.',
    },
    {
        step: '06',
        title: 'Deployment & Optimization',
        description:
        'Launch the solution, monitor performance, and continuously optimize for growth and success.',
    },
    ],
  },

  '/services/dashboards-business-systems': {
    number: '02',
    category: 'BUSINESS INTELLIGENCE & SYSTEMS',
    title: 'Dashboards &',
    accent: 'Business Systems',
    intro:
      'We turn complex information and disconnected processes into clear, useful digital tools that help teams work with confidence.',
    statement:
      'Better visibility means fewer assumptions, clearer decisions, and more control over daily operations.',
    icon: Database,
    benefits: [
      {
        title: 'Business dashboards',
        description:
          'Bring important metrics, operational data, and business activity into one clear interface.',
      },
      {
        title: 'Admin panels & portals',
        description:
          'Give your team practical tools to manage records, users, workflows, and everyday operations.',
      },
      {
        title: 'Data visualisation',
        description:
          'Make meaningful patterns easier to understand with well-structured tables, charts, filters, and summaries.',
      },
      {
        title: 'Connected business systems',
        description:
          'Integrate existing APIs and data sources to reduce fragmented information and manual updates.',
      },
    ],
    deliverables: [
      'Custom dashboards and admin interfaces',
      'Search, filtering, sorting, and data tables',
      'REST API integrations',
      'Role-aware interface experiences where required',
      'Responsive layouts and reusable components',
    ],
    process: [
      {
        step: '01',
        title: 'Map the workflow',
        description:
          'We understand how your team works today, what information matters, and where friction exists.',
      },
      {
        step: '02',
        title: 'Structure the data',
        description:
          'We define the key metrics, information hierarchy, and actions people need to take.',
      },
      {
        step: '03',
        title: 'Build the system',
        description:
          'We develop the interface, connect the required data sources, and implement the core workflows.',
      },
      {
        step: '04',
        title: 'Validate & refine',
        description:
          'We test real-world usage, improve clarity, and refine the experience based on feedback.',
      },
    ],
  },

  '/services/workflow-automation': {
    number: '03',
    category: 'SMARTER OPERATIONS',
    title: 'Workflow',
    accent: 'Automation',
    intro:
      'We help reduce repetitive work by connecting business tools, simplifying handoffs, and making everyday processes more consistent.',
    statement:
      'Your team should spend less time moving information around and more time doing meaningful work.',
    icon: Workflow,
    benefits: [
      {
        title: 'Process automation',
        description:
          'Automate repeatable business tasks, notifications, approvals, and routine updates.',
      },
      {
        title: 'Tool & API integration',
        description:
          'Connect compatible applications and services so information can move between systems more reliably.',
      },
      {
        title: 'Approval workflows',
        description:
          'Structure requests, approvals, and handoffs to help teams understand what needs to happen next.',
      },
      {
        title: 'Microsoft Power Platform',
        description:
          'Where appropriate, use Power Automate and Power Apps to create practical low-code business workflows.',
      },
    ],
    deliverables: [
      'Workflow discovery and process mapping',
      'Automation of repetitive tasks',
      'Application and API integrations',
      'Notifications, approvals, and status updates',
      'Documentation and handover guidance',
    ],
    process: [
      {
        step: '01',
        title: 'Find the friction',
        description:
          'We identify repeated tasks, delays, manual handoffs, and common sources of error.',
      },
      {
        step: '02',
        title: 'Design the workflow',
        description:
          'We map the triggers, rules, decisions, exceptions, and expected outcomes.',
      },
      {
        step: '03',
        title: 'Connect & automate',
        description:
          'We configure suitable tools and integrations, keeping the workflow understandable and maintainable.',
      },
      {
        step: '04',
        title: 'Test & optimise',
        description:
          'We validate normal and exceptional cases, document the workflow, and improve it where needed.',
      },
    ],
  },
};

type ServicePath = keyof typeof servicePages;

export default function ServiceDetail() {
  const pathname = window.location.pathname.replace(/\/+$/, '');
  const service = servicePages[pathname as ServicePath];

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="service-not-found section-shell">
          <p className="service-eyebrow">SERVICE NOT FOUND</p>
          <h1>This page is taking a different route.</h1>
          <p>
            The service page you requested could not be found. Explore our
            services to find the right fit for your business.
          </p>
          <a className="service-button" href="/#services">
            Explore services <ArrowUpRight size={17} />
          </a>
        </main>
        <Footer />
      </>
    );
  }

  const Icon = service.icon;

  return (
    <>
      <Navbar />

      <main className="service-detail">
        <section className="service-detail-hero section-shell">
          <div className="service-breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/#services">Services</a>
            <span>/</span>
            <span>{service.category}</span>
          </div>

          <div className="service-hero-grid">
            <div className="service-hero-copy">
              {/* <p className="service-eyebrow">
                {service.number} — {service.category}
              </p> */}

              <h1>
                {service.title}
                <br />
                <em>{service.accent}</em>
              </h1>

              <p className="service-hero-intro">{service.statement}</p>

              <div className="service-hero-actions">
                {/* <Link className="service-button" to="/#contact">
                  Let's Discuss The Problem <ArrowUpRight size={17} />
                </Link> */}
                <Link className="service-button" to="/contact">
  Let's Discuss The Problem <ArrowUpRight size={17} />
</Link>

                <a className="service-text-link" href="#how-we-work">
                  Explore the service <ArrowDownRight size={17} />
                </a>
              </div>
            </div>

            <div className="service-hero-art" aria-hidden="true">
              <div className="service-art-top">
                <span>AKETI / SERVICES</span>
                <span>{service.number}</span>
              </div>

              <div className="service-art-symbol">
                <Icon size={94} strokeWidth={1} />
              </div>

              <div className="service-art-orbit service-art-orbit-one" />
              <div className="service-art-orbit service-art-orbit-two" />

              <div className="service-art-caption">
                <span>THOUGHTFUL BY DESIGN</span>
                <span>BUILT FOR REAL WORK</span>
              </div>
            </div>
          </div>
        </section>

        <section className="service-statement  section-shell"  id="what-we-do">
          <div className="service-section-heading">
            <div>
              <p className="service-eyebrow">WHAT WE CAN HELP WITH</p>
              <h2>
                Practical solutions
                <br />
                <em>Real business needs</em>
              </h2>
            </div>
            <p>
              We focus on what your business actually needs, with a clear
              purpose behind every feature and every decision.
            </p>
          </div>


            <div className="service-offering-grid">
            {service.benefits.map((benefit, index) => (
                <article
                className="service-offering-card"
                key={benefit.title}
                onMouseMove={(event) => {
                    const card = event.currentTarget;
                    const rect = card.getBoundingClientRect();

                    const x = (event.clientX - rect.left) / rect.width;
                    const y = (event.clientY - rect.top) / rect.height;

                    const rotateX = (0.5 - y) * 10;
                    const rotateY = (x - 0.5) * 10;

                    card.style.setProperty('--rotate-x', `${rotateX}deg`);
                    card.style.setProperty('--rotate-y', `${rotateY}deg`);
                }}
                onMouseLeave={(event) => {
                    event.currentTarget.style.setProperty('--rotate-x', '0deg');
                    event.currentTarget.style.setProperty('--rotate-y', '0deg');
                }}
                >
                <span className="service-card-number">
                    0{index + 1}
                </span>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>

                <ArrowUpRight
                    className="service-card-arrow"
                    size={19}
                />
                </article>
            ))}
            </div>

        </section>

        <section className="service-process section-shell" id="how-we-work">
          <div className="service-section-heading">
            <div>
              <p className="service-eyebrow">HOW WE WORK</p>
              <h2>
                A clear path
                <br />
                <em>from idea to impact</em>
              </h2>
            </div>
            <p>
              A collaborative process that keeps the work focused, transparent,
              and connected to your goals.
            </p>
          </div>

                
        <div className="service-process-list">
        {service.process.map((item) => (
            <article
            className="service-process-item"
            key={item.step}
            onMouseMove={(event) => {
                const card = event.currentTarget;
                const rect = card.getBoundingClientRect();

                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                card.style.setProperty(
                '--process-rotate-x',
                `${(0.5 - y) * 5}deg`
                );
                card.style.setProperty(
                '--process-rotate-y',
                `${(x - 0.5) * 5}deg`
                );
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.setProperty(
                '--process-rotate-x',
                '0deg'
                );
                event.currentTarget.style.setProperty(
                '--process-rotate-y',
                '0deg'
                );
            }}
            >
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ArrowUpRight size={18} />
            </article>
        ))}
        </div>

        </section>

        <section className="service-cta section-shell">
          <p className="service-eyebrow">HAVE A CHALLENGE TO SOLVE?</p>
          <h2>
            Let's Solve It
            <br />
            <em>Together</em>
          </h2>
          <div className="service-cta-bottom">
            <p>
              Tell us what you are trying to improve. We will help you explore a practical next step.
            </p>
            <a
              className="service-button service-button-dark"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Let's talk <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
