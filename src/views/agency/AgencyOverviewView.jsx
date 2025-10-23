import React from 'react';
import {useAuth} from '../../contexts/AuthContext';

const agencyHighlights = [
  {label: 'Active placements', value: 42},
  {label: 'Partner facilities', value: 18},
  {label: 'Pending inquiries', value: 9},
];

function AgencyOverviewView() {
  const {user} = useAuth();

  return (
    <section className="dashboard-view dashboard-view--overview">
      <header>
        <h2>Agency overview</h2>
        <p>Monitor agency performance indicators and staffing commitments.</p>
      </header>
      <article>
        <p>
          {user
            ? `${user.name || 'Agency lead'}, here is the latest pulse on your client roster.`
            : 'Sign in to review agency-wide metrics tailored to your portfolio.'}
        </p>
        <dl className="dashboard-view__metrics">
          {agencyHighlights.map((item) => (
            <div key={item.label} className="dashboard-view__metric">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </section>
  );
}

export default AgencyOverviewView;
