import { Project } from '../types/portfolio';

export const PROJECTS: Project[] = [
  {
    id: 'resq-2',
    title: 'ResQ 2.0',
    tagline: 'Emergency Assistance & Healthcare Service Coordination Platform',
    category: 'Emergency Assistance Application',
    status: 'Working Prototype (Actively developing)',
    featured: true,
    overview: 'ResQ 2.0 is an emergency assistance and healthcare coordination web application designed to connect users quickly with nearby medical services, emergency SOS guidance, and hospital service workflows in critical moments.',
    repoUrl: 'https://github.com/shubham734013/resq-2.0',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Tailwind CSS', 'REST API'],
    stats: [
      { label: 'Architecture', value: 'Decoupled Client-Server' },
      { label: 'Data Model', value: 'Mongoose Schemas' },
      { label: 'Status', value: 'Working Prototype' },
      { label: 'Security', value: 'JWT & Input Sanitation' },
    ],
    techStack: {
      frontend: ['React 18/19', 'TypeScript', 'Tailwind CSS', 'Lucide React', 'Vite'],
      backend: ['Node.js', 'Express.js', 'REST API Architecture', 'JWT Authentication'],
      database: ['MongoDB', 'Mongoose ODM', 'Geospatial 2dsphere indexing (planned)'],
      tools: ['Git', 'Postman', 'Vite Dev Server', 'ESLint']
    },
    myContribution: 'Architected the end-to-end full-stack prototype: designed relational/document data models in Mongoose, constructed Express API routes for emergency requests, and built responsive React interfaces with emergency action states.',
    keyTechnicalChallenge: 'Guaranteeing fast, resilient client-side UX during high-stress emergency actions without UI blocking, while establishing clear data validation contracts between the frontend and the Express REST API.',
    problemStatement: 'In emergency medical situations, patients and bystanders face cognitive overload, fragmented phone directories, and delays finding nearby assistance facilities.',
    solutionArchitecture: {
      frontendLayer: 'React single-page application with modular emergency request triggers, stateful status updates, and emergency hotline quick-dials.',
      apiLayer: 'Express REST router handling endpoints: POST /api/sos/trigger, GET /api/facilities/nearby, POST /api/requests/service.',
      backendLayer: 'Node.js controller logic validating request payloads, user metadata, and dispatch queue status.',
      databaseLayer: 'MongoDB collections storing Users, EmergencyRequests, and HealthcareFacilities with indexed timestamps and coordinates.'
    },
    implementedFeatures: [
      'Interactive Emergency SOS trigger workflow with immediate dispatch simulation',
      'Healthcare facility directory structure with service category filtering',
      'Hospital assistance request submission with urgency classification',
      'REST API route structure for emergency events and status tracking',
      'Responsive mobile-first emergency view with high-contrast emergency buttons'
    ],
    plannedFeatures: [
      'Real-time WebSocket connection for live responder status updates',
      'Browser Geolocation API integration with MongoDB 2dsphere geoNear queries',
      'SMS / Twilio alert gateway for immediate off-line notification'
    ],
    currentLimitations: [
      'Current prototype operates on local/sandbox backend; external government 911/108 dispatch systems are not connected.',
      'Hospital database currently contains sample development facilities awaiting regional health board integration.'
    ],
    codeSnippets: [
      {
        filename: 'controllers/emergencyController.ts',
        language: 'typescript',
        description: 'Express handler validating emergency dispatch payload and persisting event state',
        code: `// ResQ 2.0: Backend Emergency Dispatch Controller
import { Request, Response } from 'express';
import { EmergencyRequest } from '../models/EmergencyRequest';

export const handleEmergencyTrigger = async (req: Request, res: Response) => {
  try {
    const { userId, severity, coordinates, contactPhone } = req.body;
    
    if (!severity || !coordinates) {
      return res.status(400).json({ error: 'Severity and coordinates are mandatory.' });
    }

    const newDispatch = await EmergencyRequest.create({
      userId,
      severity,
      location: {
        type: 'Point',
        coordinates: [coordinates.lng, coordinates.lat]
      },
      contactPhone,
      status: 'DISPATCH_PENDING',
      timestamp: new Date()
    });

    return res.status(201).json({
      success: true,
      dispatchId: newDispatch._id,
      status: newDispatch.status
    });
  } catch (err) {
    return res.status(500).json({ error: 'Emergency dispatch recording failed.' });
  }
};`
      },
      {
        filename: 'src/components/SosActionPanel.tsx',
        language: 'typescript',
        description: 'React client component with countdown safety trigger and feedback',
        code: `// ResQ 2.0: High-Urgency Emergency Trigger Component
import React, { useState } from 'react';
import { AlertCircle, PhoneCall, CheckCircle2 } from 'lucide-react';

export const SosActionPanel: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'idle' | 'confirming' | 'dispatched'>('idle');

  const initiateSos = async () => {
    setActiveStage('confirming');
    // Simulated client payload verification
    setTimeout(() => {
      setActiveStage('dispatched');
    }, 1200);
  };

  return (
    <div className="p-5 border border-red-900/60 bg-red-950/20 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-red-400 font-semibold tracking-wider">
          EMERGENCY DISPATCH PROTOCOL
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-red-900/40 text-red-200">ACTIVE</span>
      </div>
      <button 
        onClick={initiateSos}
        className="w-full py-4 bg-red-600 hover:bg-red-500 font-bold text-white rounded tracking-wide transition-all"
      >
        {activeStage === 'confirming' ? 'CONNECTING DISPATCH...' : 'TRIGGER EMERGENCY SOS'}
      </button>
    </div>
  );
};`
      }
    ],
    architectureFlow: [
      {
        step: '01',
        title: 'Client Emergency Event',
        detail: 'User triggers SOS button on mobile or desktop client; location and severity are packaged.',
        type: 'client'
      },
      {
        step: '02',
        title: 'REST API Ingestion',
        detail: 'Express API verifies authentication, validates payload bounds, and sanitizes input data.',
        type: 'api'
      },
      {
        step: '03',
        title: 'Node.js Coordination Service',
        detail: 'Service assigns dispatch prioritization ticket and triggers notification queue.',
        type: 'service'
      },
      {
        step: '04',
        title: 'MongoDB Storage & Audit Log',
        detail: 'Persists emergency ticket with UTC timestamp and geo-location coordinates.',
        type: 'database'
      }
    ]
  },
  {
    id: 'day-night-gymos',
    title: 'Day Night GymOS',
    tagline: 'Comprehensive Digital Operating System & Member Management SaaS',
    category: 'Gym Management SaaS',
    status: 'In Development',
    featured: true,
    overview: 'Day Night GymOS is an all-in-one gym administration system built to streamline front-desk operations, member enrollment, subscription renewal tracking, and contactless QR-based check-in workflows.',
    repoUrl: 'https://github.com/shubham734013/day-night-gymos',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'QR Auth', 'SaaS Architecture', 'Tailwind CSS'],
    stats: [
      { label: 'Role', value: 'Full-Stack Developer' },
      { label: 'Target', value: 'Boutique & 24/7 Gyms' },
      { label: 'Architecture', value: 'Modular Monolith' },
      { label: 'Module', value: 'QR Member Check-In' },
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5 Canvas QR Generator', 'Lucide Icons'],
      backend: ['Node.js', 'Express.js', 'Bcrypt password hashing', 'Session Token verification'],
      database: ['MongoDB', 'Mongoose Models (Members, Plans, AttendanceLogs)'],
      tools: ['Git', 'Postman', 'Figma Wireframing']
    },
    myContribution: 'Designed the database schema for gym memberships, created REST routes for member registration, plan expiration checks, and daily attendance verification logic.',
    keyTechnicalChallenge: 'Implementing reliable check-in validation logic that verifies member plan status and expiration dates in under 150ms during peak gym check-in hours.',
    problemStatement: 'Independent gym owners struggle with physical paper logs, manual fee follow-ups, and unverified guest entries that cause revenue leaks.',
    solutionArchitecture: {
      frontendLayer: 'Admin Dashboard with attendance overview, member search table, and QR scanner interface for reception desk.',
      apiLayer: 'Express routing: /api/members, /api/attendance/check-in, /api/memberships/renew.',
      backendLayer: 'Business logic for validating membership active status, calculating remaining plan days, and logging daily entry.',
      databaseLayer: 'MongoDB storing Members, Plans, Payments, and Attendance records with compound indexes.'
    },
    implementedFeatures: [
      'Member registration and membership plan management interface',
      'Dynamic QR code generation per member for digital identity cards',
      'Front-desk attendance check-in route with active membership verification',
      'Subscription expiration tracker highlighting overdue memberships',
      'Financial overview dashboard calculating monthly recurring revenue estimates'
    ],
    plannedFeatures: [
      'Automated WhatsApp / SMS payment reminders for impending plan expirations',
      'Biometric fingerprint scanner hardware integration via Web Serial API',
      'Member mobile portal for workout tracking and class reservation'
    ],
    currentLimitations: [
      'System is in active development with mocked payment gateway endpoints (Stripe/Razorpay integration planned for next sprint).',
      'QR verification currently tested with camera scanner emulation.'
    ],
    codeSnippets: [
      {
        filename: 'models/Member.ts',
        language: 'typescript',
        description: 'Mongoose schema with membership validity calculation methods',
        code: `// Day Night GymOS: Member Schema with Status Helper
import mongoose, { Schema, Document } from 'mongoose';

export interface IMember extends Document {
  name: string;
  phone: string;
  membershipPlan: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  startDate: Date;
  expiryDate: Date;
  status: 'ACTIVE' | 'EXPIRED' | 'FROZEN';
  qrSecret: string;
  isActive(): boolean;
}

const MemberSchema = new Schema<IMember>({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true },
  membershipPlan: { type: String, enum: ['MONTHLY', 'QUARTERLY', 'ANNUAL'], required: true },
  startDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['ACTIVE', 'EXPIRED', 'FROZEN'], default: 'ACTIVE' },
  qrSecret: { type: String, required: true }
}, { timestamps: true });

MemberSchema.methods.isActive = function(): boolean {
  return this.status === 'ACTIVE' && new Date() <= this.expiryDate;
};

export const Member = mongoose.model<IMember>('Member', MemberSchema);`
      },
      {
        filename: 'routes/attendanceRoutes.ts',
        language: 'typescript',
        description: 'Attendance check-in verification endpoint',
        code: `// Day Night GymOS: QR Attendance Verification Handler
import { Router } from 'express';
import { Member } from '../models/Member';
import { Attendance } from '../models/Attendance';

const router = Router();

router.post('/check-in', async (req, res) => {
  const { qrSecret } = req.body;
  const member = await Member.findOne({ qrSecret });
  
  if (!member) {
    return res.status(404).json({ allowed: false, message: 'Member not found.' });
  }

  if (!member.isActive()) {
    return res.status(403).json({
      allowed: false,
      message: 'Membership has expired. Please renew at the front desk.',
      expiryDate: member.expiryDate
    });
  }

  const log = await Attendance.create({
    memberId: member._id,
    checkInTime: new Date()
  });

  return res.json({
    allowed: true,
    memberName: member.name,
    plan: member.membershipPlan,
    checkInTime: log.checkInTime
  });
});

export default router;`
      }
    ],
    architectureFlow: [
      {
        step: '01',
        title: 'Member QR Scan',
        detail: 'Front-desk camera or handheld scanner reads encrypted member QR code token.',
        type: 'client'
      },
      {
        step: '02',
        title: 'API Authorization',
        detail: 'Express server queries database for matching token and active subscription window.',
        type: 'api'
      },
      {
        step: '03',
        title: 'Business Validation',
        detail: 'Evaluates plan duration: grants entry if valid, flags overdue reminder if expired.',
        type: 'service'
      },
      {
        step: '04',
        title: 'Attendance Ledger',
        detail: 'Inserts timestamped check-in record in MongoDB and updates real-time dashboard count.',
        type: 'database'
      }
    ]
  }
];
