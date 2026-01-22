import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import api from '../api';
import type { Referral } from '../types';

type Props = {
  onLogout: () => void;
  userName: string;
};

type Summary = {
  referrals: { status: string; count: number }[];
  facilities: number;
  agencies: number;
};

const AdminDashboard: FC<Props> = ({ onLogout, userName }) => {
  const queryClient = useQueryClient();

  const referralsQuery = useQuery({
    queryKey: ['admin-referrals'],
    queryFn: async () => {
      const { data } = await api.get<{ referrals: Referral[] }>('/referrals');
      return data.referrals;
    },
  });

  const summaryQuery = useQuery({
    queryKey: ['reports-summary'],
    queryFn: async () => {
      const { data } = await api.get<Summary>('/reports/summary');
      return data;
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({ referralId, facilityId }: { referralId: string; facilityId: string }) => {
      await api.post(`/referrals/${referralId}/assign`, { facility_id: facilityId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-referrals'] });
    },
  });

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <h2>Admin Hub</h2>
        <p>Logged in as {userName}</p>
        <nav>
          <button onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-referrals'] })}>Refresh Queue</button>
          <button onClick={() => queryClient.invalidateQueries({ queryKey: ['reports-summary'] })}>Refresh Reports</button>
          <button onClick={onLogout}>Sign Out</button>
        </nav>
      </aside>
      <main className="content">
        <section className="card">
          <h3>Referral Queue</h3>
          {referralsQuery.isLoading ? (
            <p>Loading…</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>ASAM Level</th>
                  <th>Status</th>
                  <th>Facility</th>
                  <th>Consent</th>
                  <th>Actions</th>
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
                    <td>{referral.facility_id ? referral.facility_id.slice(0, 8) : 'Unassigned'}</td>
                    <td style={{ maxWidth: 220 }}>{referral.consent_document ?? 'Encrypted'}</td>
                    <td>
                      <AssignForm
                        onAssign={(facilityId: string) =>
                          assignMutation.mutate({ referralId: referral.id, facilityId })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        <section className="card">
          <h3>Compliance Snapshot</h3>
          {summaryQuery.isLoading ? (
            <p>Loading…</p>
          ) : summaryQuery.isError ? (
            <p>Unable to load summary.</p>
          ) : (
            <div className="status-grid">
              <div className="status-card">
                <h4>Referral Volume</h4>
                <ul>
                  {summaryQuery.data?.referrals.map(item => (
                    <li key={item.status}>
                      {item.status}: <strong>{item.count}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="status-card">
                <h4>Active Facilities</h4>
                <p>{summaryQuery.data?.facilities}</p>
              </div>
              <div className="status-card">
                <h4>Referral Agencies</h4>
                <p>{summaryQuery.data?.agencies}</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const AssignForm: FC<{ onAssign: (facilityId: string) => void }> = ({ onAssign }) => {
  return (
    <form
      style={{ display: 'flex', gap: '0.5rem' }}
      onSubmit={event => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement & { facilityId: HTMLInputElement };
        if (form.facilityId.value) {
          onAssign(form.facilityId.value);
          form.reset();
        }
      }}
    >
      <input
        name="facilityId"
        placeholder="Facility UUID"
        required
        style={{ width: 180 }}
      />
      <button className="primary-btn" type="submit">
        Assign
      </button>
    </form>
  );
};

export default AdminDashboard;
