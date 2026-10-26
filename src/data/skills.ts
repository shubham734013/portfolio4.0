import { SkillCategory } from '../types/portfolio';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Core Languages',
    description: 'Foundational programming languages used for systems engineering, scripting, and web logic.',
    items: [
      {
        name: 'JavaScript (ES6+)',
        level: 'Primary Language',
        projectsUsedIn: ['ResQ 2.0', 'Day Night GymOS', 'Portfolio'],
        description: 'Asynchronous programming, closures, promises, event loop, DOM manipulation, modular architecture.'
      },
      {
        name: 'Python',
        level: 'Practical & Scripting',
        projectsUsedIn: ['Academic Labs', 'Automation scripts'],
        description: 'Data structures, algorithm problem solving, scripting, backend utility tools.'
      },
      {
        name: 'C++',
        level: 'Computer Science Core',
        projectsUsedIn: ['JECRC CSE Coursework'],
        description: 'Object-oriented programming, memory management pointers, STL algorithms, time complexity optimization.'
      },
      {
        name: 'C',
        level: 'Systems Foundation',
        projectsUsedIn: ['JECRC Systems Programming'],
        description: 'Low-level memory layouts, structs, pointers, basic system-level constructs.'
      }
    ]
  },
  {
    category: 'Frontend Engineering',
    description: 'Component architecture, state management, and modern browser presentation.',
    items: [
      {
        name: 'React.js',
        level: 'Production Focus',
        projectsUsedIn: ['ResQ 2.0', 'Day Night GymOS'],
        description: 'Hooks, custom hooks, reusable modular UI, context API, controlled forms, lifecycle handling.'
      },
      {
        name: 'TypeScript',
        level: 'Development Standard',
        projectsUsedIn: ['ResQ 2.0', 'Portfolio Engine'],
        description: 'Strict type safety, custom interfaces, generic data types, build-time error mitigation.'
      },
      {
        name: 'Tailwind CSS',
        level: 'Styling Architecture',
        projectsUsedIn: ['ResQ 2.0', 'Day Night GymOS', 'Portfolio'],
        description: 'Utility-first responsive layouts, design token customization, dark mode themes, clean CSS execution.'
      },
      {
        name: 'HTML5 & Canvas API',
        level: 'Web Fundamentals',
        projectsUsedIn: ['GymOS QR Code', 'Portfolio 3D Screen Canvas'],
        description: 'Semantic markup, accessibility landmarks, 2D dynamic pixel manipulation for textures.'
      }
    ]
  },
  {
    category: 'Backend & APIs',
    description: 'Server architecture, RESTful endpoints, request lifecycle, and data validation.',
    items: [
      {
        name: 'Node.js',
        level: 'Server Runtime',
        projectsUsedIn: ['ResQ 2.0 Backend', 'GymOS Backend'],
        description: 'Event-driven server runtime, file system handling, npm ecosystem, modular package design.'
      },
      {
        name: 'Express.js',
        level: 'API Framework',
        projectsUsedIn: ['ResQ 2.0', 'GymOS REST Server'],
        description: 'Middleware pipelines, routing architecture, error-handling middleware, CORS, request parsing.'
      },
      {
        name: 'RESTful API Design',
        level: 'Architectural Style',
        projectsUsedIn: ['Emergency Dispatch API', 'Attendance Check-in API'],
        description: 'Resource-oriented URIs, HTTP status code discipline (200, 201, 400, 401, 404, 500), JSON contracts.'
      },
      {
        name: 'Authentication Concepts',
        level: 'Security Basics',
        projectsUsedIn: ['GymOS Auth', 'ResQ User Guard'],
        description: 'JWT token signing, bcrypt password hashing, authorization header verification.'
      }
    ]
  },
  {
    category: 'Databases & Infrastructure',
    description: 'Document modeling, relationship integrity, and developer workflows.',
    items: [
      {
        name: 'MongoDB',
        level: 'NoSQL Document Database',
        projectsUsedIn: ['ResQ 2.0', 'Day Night GymOS'],
        description: 'JSON document persistence, collections, aggregation pipelines, indexed lookups.'
      },
      {
        name: 'Mongoose ODM',
        level: 'Schema Modeling',
        projectsUsedIn: ['ResQ 2.0 Models', 'GymOS Members/Attendance'],
        description: 'Typed schemas, document instance methods, pre/post middleware hooks, data validation.'
      },
      {
        name: 'Git & GitHub',
        level: 'Version Control',
        projectsUsedIn: ['All Repositories'],
        description: 'Branch management, semantic commits, PR reviews, merge conflict resolution.'
      },
      {
        name: 'Postman & DevTools',
        level: 'Inspection & Testing',
        projectsUsedIn: ['API Verification'],
        description: 'Endpoint request testing, payload debugging, network inspection, browser profiling.'
      }
    ]
  }
];

export const DEVELOPMENT_FOCUS_AREAS = [
  {
    title: 'Full-Stack Web Development',
    summary: 'Building connected web applications with high-fidelity React frontends and scalable Node.js backends.',
    icon: 'Layers'
  },
  {
    title: 'API Integration & Data Contracts',
    summary: 'Designing predictable, type-safe REST endpoints with strict validation and intuitive error structures.',
    icon: 'Network'
  },
  {
    title: 'Database-Driven Applications',
    summary: 'Structuring clean MongoDB schemas with Mongoose models to represent real-world entities accurately.',
    icon: 'Database'
  }
];
