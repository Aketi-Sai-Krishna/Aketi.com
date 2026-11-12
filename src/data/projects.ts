import gymStep1 from './images/gym_step1.png';
import gymStep2 from './images/gym_step2.png';
import gymStep3 from './images/gym_step3.png';
import gymStep4 from './images/gym_step4.png';
import Dashboard from './images/Gym_dashboard.png';
import websiteView from './images/web1.png';
import mobileView from './images/website_mobile.png';

export type ProjectStep = {
  step: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type Project = {
  slug: string;
  number: string;
  category: string;
  title: string;
  shortDescription: string;
  description: string;
  client: string;
  year: string;
  services: string[];
  coverImage: string;
  coverAlt: string;
  problemTitle: string;
  problemDescription: string;
  challenges: string[];
  process: ProjectStep[];
  resultTitle: string;
  resultDescription: string;
  results: string[];
  gallery: {
    image: string;
    alt: string;
    caption: string;
  }[];
};

export const projects: Project[] = [
  {
    slug: 'gym-management-dashboard',
    number: '01',
    category: 'BUSINESS SYSTEMS',
    title: 'Gym Management Dashboard',
    shortDescription:
      'A centralized membership management experience designed to simplify everyday gym operations',
    description:
      'A practical digital management system that brings member records, membership plans, payment information and renewal tracking into one organized dashboard',
    client: 'I FITNESS CLUB',
    year: '2026',
    services: [
      'Product Design',
      'Frontend Development',
      'Dashboard Development',
      'Database Integration',
    ],
    coverImage: Dashboard,
    coverAlt: 'Gym membership dashboard preview',

    problemTitle: 'Disorganised Gym Operations',
    problemDescription:
      'Gym membership information, payment records and renewal dates need to be easy to manage. The goal was to replace a scattered manual process with a centralized dashboard that makes everyday membership operations easier to understand',
    challenges: [
      'Keeping member information organized and accessible.',
      'Tracking active memberships and upcoming renewals.',
      'Identifying overdue and due-today payments.',
      'Managing member records without unnecessary complexity.',
    ],

    process: [
      {
        step: '01',
        title: 'Discover & Define',
        description:
          'We identified key administrative challenges across member records, membership statuses, payment tracking and renewals. Our focus was to simplify daily operations through a clear, organised experience',
        image: gymStep1,
        imageAlt: 'Gym membership management requirements',
      },
      {
        step: '02',
        title: 'Plan the right-sized solution',
        description:
          'We organized the experience around a clear dashboard, member records and membership information. We planned the data structure, form fields, validation rules and access requirements before implementing the interface.',
        image: gymStep2,
        imageAlt: 'Gym dashboard planning and interface structure',
      },
      {
        step: '03',
        title: 'Build in clear steps',
        description:
          'We developed the responsive dashboard using React, TypeScript, Tailwind CSS and Material UI. Supabase provides the database and authentication layer. The experience includes member management, phone-number validation, membership statuses and payment details.',
        image: gymStep3,
        imageAlt: 'Gym management dashboard development',
      },
      {
        step: '04',
        title: 'Improve as you grow',
        description:
          'We structured the application around reusable components and a centralized member database, making it easier to maintain and extend. The dashboard is designed to support future improvements as the gym’s operational requirements evolve.',
        image: gymStep4,
        imageAlt: 'Gym dashboard improvements and responsive experience',
      },
    ],

    resultTitle: 'A clearer view of every membership',
    resultDescription:
      'The result is a centralized gym management dashboard that brings member information, membership status and payment tracking into one interface',
    results: [
      'Centralized member records.',
      'Clear active, due-soon, due-today and overdue statuses.',
      'Membership and payment information in one place.',
      'Responsive interface for different screen sizes.',
    ],

    gallery: [
      {
        image: websiteView ,
        alt: 'Gym dashboard overview',
        caption: 'Dashboard overview',
      },
      {
        image: mobileView,
        alt: 'Gym dashboard responsive view',
        caption: 'Responsive experience',
      },
    ],
  },
];

export default function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
