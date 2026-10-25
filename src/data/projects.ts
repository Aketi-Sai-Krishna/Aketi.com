export type Project = {
  number: string;
  name: string;
  type: string;
  problem: string;
  solution: string;
  tags: string[];
  visual: 'fitness' | 'inventory';
};

// The second item is clearly labelled as a concept, not client work.
const projects: Project[] = [
  {
    number: '01',
    name: 'I FITNESS CLUB',
    type: 'Business operations · Dashboard',
    problem: 'Membership details scattered across spreadsheets and messages.',
    solution: 'A focused membership dashboard for member records, renewal dates, payment status, and everyday admin work.',
    tags: ['React', 'TypeScript', 'Supabase'],
    visual: 'fitness',
  },
  {
    number: '02',
    name: 'THE NEXT BUSINESS',
    type: 'Inventory · Concept direction',
    problem: 'Stock updates shouldn’t depend on someone remembering every little thing.',
    solution: 'A proposed inventory workflow that makes stock movement, low-stock alerts, and reporting easier to manage.',
    tags: ['Workflow design', 'Dashboards', 'Automation'],
    visual: 'inventory',
  },
];

export default projects;
