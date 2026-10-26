import { TimelineEntry, Certification } from '../types/portfolio';

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 'jecrc-btech',
    date: '2024 — Present (Expected 2028)',
    type: 'education',
    title: 'BTech in Computer Science and Engineering',
    organization: 'JECRC University',
    description: 'Pursuing undergraduate degree focusing on software engineering principles, algorithms, data structures, and full-stack software development.',
    tags: ['C++', 'Python', 'Data Structures', 'Database Systems', 'Computer Networks'],
    highlights: [
      'Core coursework in object-oriented programming, relational databases, and discrete mathematics.',
      'Active exploration of modern full-stack web architectures outside the standard curriculum.',
      'Building practical prototypes solving real-life challenges (ResQ 2.0 & GymOS).'
    ]
  },
  {
    id: 'xebia-internship',
    date: 'Completed (2 Weeks)',
    type: 'internship',
    title: 'Virtual Engineering Internship',
    organization: 'Xebia',
    description: 'Completed a 2-week virtual engineering internship exposing foundational enterprise software practices and modern tech methodologies.',
    tags: ['Software Engineering Practices', 'Enterprise Foundations', 'Virtual Internship'],
    highlights: [
      'Two-week immersive technical training program on contemporary software practices.',
      'Exploration of clean code structure, agile software cycles, and professional workflows.',
      'Awarded verified completion certificate upon successful submission of deliverables.'
    ]
  },
  {
    id: 'adobe-hackathon',
    date: 'Participant Milestone',
    type: 'hackathon',
    title: 'Adobe Hackathon Participant',
    organization: 'Adobe',
    description: 'Participated in a competitive hackathon organized with Adobe, collaborating on problem statements involving creative and user-focused software engineering.',
    tags: ['Hackathon', 'Rapid Prototyping', 'Product Design', 'Problem Solving'],
    highlights: [
      'Engaged in intensive time-boxed problem-solving under competitive hackathon guidelines.',
      'Prototyped software concepts emphasizing intuitive user interfaces and rapid API coordination.',
      'Received official Certificate of Participation.'
    ]
  },
  {
    id: 'resq-project-milestone',
    date: '2024 — 2025',
    type: 'milestone',
    title: 'ResQ 2.0 Architecture & Prototype Release',
    organization: 'Independent Engineering',
    description: 'Designed and deployed the initial working prototype of ResQ 2.0, testing client SOS triggers and server-side emergency dispatch routing.',
    commitHash: 'commit b4f8e91',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    highlights: [
      'Created decoupled client and server architectures.',
      'Validated REST route handlers using Postman automated collections.'
    ]
  },
  {
    id: 'gymos-project-milestone',
    date: '2025 — Present',
    type: 'milestone',
    title: 'Day Night GymOS Architecture & QR Verification',
    organization: 'Independent Engineering',
    description: 'Commenced architectural development of a SaaS gym operations platform with contactless QR attendance workflows.',
    commitHash: 'commit 78a2d10',
    tags: ['SaaS', 'QR Check-in', 'Mongoose Schemas'],
    highlights: [
      'Constructed schema relationships for membership plans and daily attendance logs.',
      'Integrated dynamic QR token generation for member credentials.'
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-google-cloud',
    title: 'Google Cloud Certificate',
    issuer: 'Google Cloud',
    date: 'Credential Verified',
    status: 'Title To Be Confirmed',
    description: 'Completed foundational cloud computing modules covering cloud infrastructure, managed services, compute concepts, and deployment architecture.',
    skillsTagged: ['Cloud Infrastructure', 'GCP Basics', 'DevOps Foundations']
  },
  {
    id: 'cert-xebia',
    title: 'Virtual Internship Certificate',
    issuer: 'Xebia',
    date: 'Credential Verified',
    status: 'Completed',
    description: 'Official certificate awarded for successful completion of the two-week intensive engineering virtual internship.',
    skillsTagged: ['Software Methodologies', 'Engineering Standards']
  },
  {
    id: 'cert-adobe',
    title: 'Adobe Hackathon Certificate of Participation',
    issuer: 'Adobe',
    date: 'Event Verified',
    status: 'Participation Verified',
    description: 'Official recognition for participation in the collaborative software and innovation hackathon challenge.',
    skillsTagged: ['Rapid Prototyping', 'Problem Formulation', 'Team Collaboration']
  }
];
