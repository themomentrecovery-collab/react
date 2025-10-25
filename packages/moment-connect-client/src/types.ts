export type Referral = {
  id: string;
  agency_id: string;
  facility_id: string | null;
  client_name: string;
  asam_level: string;
  status: 'submitted' | 'assigned' | 'accepted' | 'denied' | 'completed';
  created_at: string;
  updated_at: string;
  bed_days_reserved: number;
  consent_document: string | null;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  referral_id: string;
  message: string;
  created_at: string;
};
