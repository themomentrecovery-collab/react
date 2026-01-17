export type AccountType =
  | 'referral-agency'
  | 'facility'
  | 'hub-admin'
  | 'hub-user';

export interface AccountRecord {
  username: string;
  password: string;
  type: AccountType;
  twoFactorEnabled: boolean;
}

export interface RegistrationCodeRecord {
  code: string;
  flow: 'employee' | 'facility-rep' | 'referral-agency';
  active: boolean;
}

export const accountsData: AccountRecord[] = [
  {
    username: 'referral.agency',
    password: 'Referral@2025',
    type: 'referral-agency',
    twoFactorEnabled: true,
  },
  {
    username: 'facility.user',
    password: 'Facility@2025',
    type: 'facility',
    twoFactorEnabled: false,
  },
  {
    username: 'hub.admin',
    password: 'Admin@2025',
    type: 'hub-admin',
    twoFactorEnabled: true,
  },
  {
    username: 'hub.user',
    password: 'HubUser@2025',
    type: 'hub-user',
    twoFactorEnabled: false,
  },
];

export const registrationCodes: RegistrationCodeRecord[] = [
  { code: '123456', flow: 'employee', active: true },
  { code: '654321', flow: 'facility-rep', active: true },
  { code: '246810', flow: 'referral-agency', active: true },
  { code: '111111', flow: 'employee', active: false },
];

export const dashboardRouteByType: Record<AccountType, string> = {
  'referral-agency': '/dashboard/referral-agency',
  facility: '/dashboard/facility',
  'hub-admin': '/dashboard/hub-admin',
  'hub-user': '/dashboard/hub-user',
};
