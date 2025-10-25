import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import api from '../api';
import type { Referral } from '../types';

type Props = {
  onLogout: () => void;
  userName: string;
};

type ResponsePayload = {
  status: 'accepted' | 'denied' | 'completed';
  bed_days_reserved?: number;
};

const FacilityDashboard: FC<Props> = ({ onLogout, userName }) => {
  const queryClient = useQueryClient();

  const referralsQuery = useQuery({
    queryKey: ['facility-referrals'],
    queryFn: async () => {
      const { data } = await api.get<{ referrals: Referral[] }>('/referrals');
      return data.referrals;
    },
  });

  const respondMutation = useMutation({
    mutationFn: async ({ referralId, payload }: { referralId: string; payload: ResponsePayload }) => {
      await api.post(`/referrals/${referralId}/respond`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facility-referrals'] });
    },
  });

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <h2>Facility Console</h2>
        <p>Welcome, {userName}</p>
        <nav>
          <button onClick={() => queryClient.invalidateQueries({ queryKey: ['facility-referrals'] })}>
            Refresh Queue
          </button>
          <button onClick={onLogout}>Sign Out</button>
        </nav>
      </aside>
      <main className="content">
        <section className="card">
          <h3>Incoming Referrals</h3>
          {referralsQuery.isLoading ? (
            <p>Loading…</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>ASAM</th>
                  <th>Status</th>
                  <th>Consent</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {referralsQuery.data?.map(referral => (
                  <tr key={referral.id}>
                    <td>{referral.client_name}</td>
                    <td>{referral.asam_level}</td>
                    <td>
                      <span className="badge">{referral.status}</span>
                    </td>
                    <td style={{ maxWidth: 220 }}>{referral.consent_document ?? 'Encrypted'}</td>
                    <td>
                      <ResponseButtons
                        onRespond={payload =>
                          respondMutation.mutate({ referralId: referral.id, payload })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

const ResponseButtons: FC<{ onRespond: (payload: ResponsePayload) => void }> = ({ onRespond }) => {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button className="primary-btn" onClick={() => onRespond({ status: 'accepted', bed_days_reserved: 5 })}>
        Accept
      </button>
      <button className="tab" onClick={() => onRespond({ status: 'denied' })}>
        Deny
      </button>
      <button className="tab" onClick={() => onRespond({ status: 'completed' })}>
        Complete
      </button>
    </div>
  );
};

export default FacilityDashboard;
