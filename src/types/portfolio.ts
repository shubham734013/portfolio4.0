export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Emergency Assistance Application' | 'Gym Management SaaS';
  status: 'Working Prototype (Actively developing)' | 'In Development';
  overview: string;
  featured: boolean;
  repoUrl: string;
  demoUrl?: string;
  stats?: { label: string; value: string }[];
  tags: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  myContribution: string;
  keyTechnicalChallenge: string;
  problemStatement: string;
  solutionArchitecture: {
    frontendLayer: string;
    apiLayer: string;
    backendLayer: string;
    databaseLayer: string;
  };
  implementedFeatures: string[];
  plannedFeatures: string[];
  currentLimitations: string[];
  codeSnippets: {
    filename: string;
    language: string;
    code: string;
    description: string;
  }[];
  architectureFlow: {
    step: string;
    title: string;
    detail: string;
    type: 'client' | 'api' | 'service' | 'database';
  }[];
}

export interface SkillCategory {
  category: string;
  description: string;
  items: {
    name: string;
    level: string;
    projectsUsedIn: string[];
    description: string;
  }[];
}

export interface TimelineEntry {
  id: string;
  date: string;
  type: 'milestone' | 'internship' | 'hackathon' | 'education';
  title: string;
  organization: string;
  description: string;
  commitHash?: string;
  tags: string[];
  highlights?: string[];
  status?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  status: 'Completed' | 'Participation Verified' | 'Title To Be Confirmed';
  credentialLink?: string;
  description: string;
  skillsTagged: string[];
}
