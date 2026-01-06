export interface FacilityDetails {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  county: string;
  website?: string;
  contactName: string;
  contactEmail?: string;
  contactPhone: string;
  treatmentTypes: string[];
  matServices: boolean;
  otherServices?: string[];
  totalBeds: number;
  availableBeds: number;
  nextAvailableBedDate: string;
  lastUpdate: string;
  distanceMiles?: number;
  lastReferralPlaced?: string;
  insuranceAccepted?: string[];
  notes?: string;
}

export const facilityDirectory: Record<string, FacilityDetails> = {
  'FC-900': {
    id: 'FC-900',
    name: 'Harborview Wellness',
    phone: '(206) 555-0158',
    email: 'intake@harborviewwellness.org',
    address: '410 Terry Ave, Seattle, WA 98104',
    county: 'King County',
    website: 'https://harborviewwellness.org',
    contactName: 'Stacey Young',
    contactEmail: 'stacey.young@harborviewwellness.org',
    contactPhone: '(206) 555-0184',
    treatmentTypes: ['Residential Treatment', 'MAT'],
    matServices: true,
    otherServices: ['Aftercare', 'Family Support'],
    totalBeds: 120,
    availableBeds: 2,
    nextAvailableBedDate: '2025-04-15',
    lastUpdate: '2025-04-12T07:45:00',
    distanceMiles: 5,
    lastReferralPlaced: '2025-04-01',
    insuranceAccepted: ['Medicaid', 'Private Insurance'],
  },
  'FC-901': {
    id: 'FC-901',
    name: 'Blue Ridge Recovery',
    phone: '(425) 555-0107',
    email: 'hello@blueridgerecovery.com',
    address: '1525 SE 9th St, North Bend, WA 98045',
    county: 'King County',
    website: 'https://blueridgerecovery.com',
    contactName: 'Daniel Price',
    contactEmail: 'daniel.price@blueridgerecovery.com',
    contactPhone: '(425) 555-0198',
    treatmentTypes: ['Residential Treatment'],
    matServices: false,
    otherServices: ['Family Therapy'],
    totalBeds: 80,
    availableBeds: 0,
    nextAvailableBedDate: '2025-04-20',
    lastUpdate: '2025-04-11T20:20:00',
    distanceMiles: 35,
    lastReferralPlaced: '2025-03-28',
    insuranceAccepted: ['Private Insurance'],
  },
  'FC-880': {
    id: 'FC-880',
    name: 'Cascade View Center',
    phone: '(425) 555-0122',
    email: 'intake@cascadeview.org',
    address: '2150 112th Ave NE, Bellevue, WA 98004',
    county: 'King County',
    contactName: 'Michelle Ortega',
    contactEmail: 'mortega@cascadeview.org',
    contactPhone: '(425) 555-0191',
    treatmentTypes: ['Residential', 'Outpatient'],
    matServices: true,
    totalBeds: 96,
    availableBeds: 4,
    nextAvailableBedDate: '2025-04-16',
    lastUpdate: '2025-04-12T06:15:00',
    lastReferralPlaced: '2025-04-08',
  },
  'FC-884': {
    id: 'FC-884',
    name: 'Evergreen Recovery',
    phone: '(360) 555-0196',
    email: 'support@evergreenrecovery.org',
    address: '8020 Evergreen Way, Everett, WA 98203',
    county: 'Snohomish County',
    contactName: 'Paula Shaw',
    contactEmail: 'pshaw@evergreenrecovery.org',
    contactPhone: '(360) 555-0197',
    treatmentTypes: ['Residential', 'Aftercare'],
    matServices: false,
    totalBeds: 110,
    availableBeds: 6,
    nextAvailableBedDate: '2025-04-17',
    lastUpdate: '2025-04-11T10:40:00',
    lastReferralPlaced: '2025-04-03',
  },
  'FC-870': {
    id: 'FC-870',
    name: 'Northwest Sober Living',
    phone: '(206) 555-0133',
    email: 'info@northwestsober.org',
    address: '1125 E Pine St, Seattle, WA 98122',
    county: 'King County',
    contactName: 'Ian Harper',
    contactPhone: '(206) 555-0172',
    treatmentTypes: ['Sober Living'],
    matServices: false,
    totalBeds: 48,
    availableBeds: 3,
    nextAvailableBedDate: '2025-04-18',
    lastUpdate: '2025-04-10T18:10:00',
  },
};
