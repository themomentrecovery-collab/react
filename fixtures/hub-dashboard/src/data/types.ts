export interface AlertRecord {
  id: string;
  summary: string;
  details: string;
  timestamp: string;
  sender: string;
  requiresAction: boolean;
  actionTaken: boolean;
  read: boolean;
  important: boolean;
  showOnHome: boolean;
  actionableReason?: string;
}

export interface ReportOption {
  id: string;
  referralId: string;
  referralName: string;
  description: string;
}

export interface ReferralPoolRecord {
  id: string;
  name: string;
  programType: string;
  duration: string;
  points: number;
  creationDate: string;
  county: string;
  highPriority: boolean;
  placeImmediately: boolean;
  futurePlacement: boolean;
  totalReferralPoints: number;
  originatingCounty: string;
}

export interface ReferralContact {
  firstName: string;
  lastName: string;
  title: string;
  phone: string;
  email: string;
  county: string;
}

export interface ReferralDetails {
  agencyName: string;
  contact: ReferralContact;
  willingToPlaceOutsideCounty: boolean;
  client: {
    firstName: string;
    middleInitial?: string;
    lastName: string;
    dateOfBirth: string;
    age: number;
    phone: string;
    email: string;
    address: string;
    county: string;
    gender: string;
    language: string;
    secondaryLanguage?: string;
    drugOfChoice: string;
    adaAccommodation: string;
    pregnancyStatus: string;
    minorStatus: string;
    matRequirement: string;
  };
  willingOutsideCounty: boolean;
  courtOrder: boolean;
  asamLevel?: string;
  requestedProgramType: string;
  requestedDuration: string;
  preferredLanguage: string;
  secondaryLanguages?: string[];
  substanceOfAbuse: string;
  progressReportFrequency: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insurance?: {
    type: string;
    policyNumber?: string;
    socialSecurity?: string;
  };
  notes?: string;
}

export interface PendingPlacementReferral {
  id: string;
  name: string;
  stage: 'New' | 'Claimed' | 'Sent to Facility' | 'Accepted' | 'Hold Queue';
  timerEndsAt: string;
  highPriority: boolean;
  matchDueInMinutes: number;
  facilityRotation: FacilityOption[];
  programType: string;
  duration: string;
}

export interface FacilityOption {
  id: string;
  name: string;
  phone: string;
  address: string;
  county: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  facilityType: string;
  bedsAvailable: number;
  nextAvailableBedDate: string;
  lastBedUpdate: string;
  matServices: boolean;
  distanceMiles: number;
  website?: string;
  services?: string[];
  totalBeds?: number;
  lastReferralPlaced?: string;
}

export interface PendingIntakeReferral {
  id: string;
  name: string;
  facilityName: string;
  facilityId: string;
  intakeDateTime: string;
}

export interface ActiveReferral {
  id: string;
  name: string;
  facilityName: string;
  facilityId: string;
  startDate: string;
  endDate: string;
}

export interface CompletedReferral extends ActiveReferral {
  completionDate: string;
}

export interface HoldQueueReferral {
  id: string;
  name: string;
  queueDate: string;
  reason: 'Unable to Match' | 'Requested Delayed Placement';
  nextAvailableBedDate: string;
  facilityName: string;
  facilityId: string;
  status: 'start' | 'retry';
}

export interface Conversation {
  id: string;
  category: 'Referral Agencies' | 'Facilities' | 'Hub Admins' | 'Hub Users' | 'Archives';
  referralName: string;
  referralId: string;
  counterpartName: string;
  counterpartId?: string;
  unreadCount: number;
  messages: ConversationMessage[];
  archived: boolean;
  referralDetailsId: string;
}

export interface ConversationMessage {
  id: string;
  sender: 'hubUser' | 'counterpart';
  sentAt: string;
  body: string;
}

export interface PerformanceSnapshot {
  timePeriod: 'pay-period' | 'one-month' | 'one-year';
  stats: Record<string, number>;
  topPerformer: {
    name: string;
    points: number;
    claimed: number;
    lost: number;
    averagePlacementSeconds: number;
  };
  officeAverage: {
    points: number;
    claimed: number;
    lost: number;
    averagePlacementSeconds: number;
  };
}

export interface PreferenceSettings {
  personalPhone: string;
  personalEmail: string;
  homeAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  workPhone: string;
  workEmail: string;
  notifications: Record<string, boolean>;
}
