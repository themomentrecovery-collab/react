import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import api from '../api';
import type { Referral } from '../types';

type ReferralForm = {
  client_name: string;
  asam_level: string;
  consent_document: string;
};

type Props = {
  onLogout: () => void;
  userName: string;
};

const AgencyDashboard: FC<Props> = ({ onLogout, userName }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<ReferralForm>();

  const referralsQuery = useQuery({
    queryKey: ['referrals'],
    queryFn: async () => {
      const { data } = await api.get<{ referrals: Referral[] }>('/referrals');
      return data.referrals;
    },
  });

  const submitReferral = useMutation({
    mutationFn: async (values: ReferralForm) => {
      const { data } = await api.post<{ referral: Referral }>('/referrals', values);
      return data.referral;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      reset();
    },
  });

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <h2>Agency Portal</h2>
        <p>Welcome back, {userName}</p>
        <nav>
          <button onClick={() => queryClient.invalidateQueries({ queryKey: ['referrals'] })}>
            Refresh Referrals
          </button>
          <button onClick={onLogout}>Sign Out</button>
        </nav>
      </aside>
      <main className="content">
        <section className="card">
          <h3>Submit New Referral</h3>
          <form
            onSubmit={handleSubmit(values => {
              submitReferral.mutate(values);
            })}
          >
            <label>
              Client Name
              <input {...register('client_name', { required: true })} />
            </label>
            <label>
              ASAM Level of Care
              <select {...register('asam_level', { required: true })}>
                <option value="">Select level</option>
                <option value="ASAM 1.0">ASAM 1.0 Outpatient</option>
                <option value="ASAM 2.5">ASAM 2.5 Partial Hospitalization</option>
                <option value="ASAM 3.5">ASAM 3.5 Residential</option>
                <option value="ASAM 4.0">ASAM 4.0 Medically Managed</option>
              </select>
            </label>
            <label>
              Consent Narrative
              <textarea rows={4} placeholder="Summarize consent authorization" {...register('consent_document', { required: true })} />
            </label>
            <button className="primary-btn" type="submit" disabled={submitReferral.isPending}>
              {submitReferral.isPending ? 'Encrypting…' : 'Submit Referral'}
            </button>
          </form>
        </section>
        <section className="card">
          <h3>Referral Pipeline</h3>
          {referralsQuery.isLoading ? (
            <p>Loading…</p>
          ) : referralsQuery.isError ? (
            <p>Unable to load referrals.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>ASAM LOC</th>
                  <th>Status</th>
                  <th>Facility</th>
                  <th>Submitted</th>
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
                    <td>{referral.facility_id ? referral.facility_id.slice(0, 8) : '—'}</td>
                    <td>{new Date(referral.created_at).toLocaleString()}</td>
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

export default AgencyDashboard;
