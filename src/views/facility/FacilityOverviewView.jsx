import React from 'react';
import {useAuth} from '../../contexts/AuthContext';

const facilityStats = [
  {label: 'Occupied beds', value: 128},
  {label: 'Open beds', value: 14},
  {label: 'Scheduled discharges', value: 6},
];

function FacilityOverviewView() {
  const {user} = useAuth();

  return (
    <section className="dashboard-view dashboard-view--overview">
      <header>
        <h2>Facility overview</h2>
        <p>Track census changes and resident movements in real time.</p>
      </header>
      <article>
        <p>
          {user
            ? `${user.name || 'Facility contact'}, here is the latest occupancy summary.`
            : 'Sign in to see occupancy metrics for your facility.'}
        </p>
        <dl className="dashboard-view__metrics">
          {facilityStats.map((item) => (
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

export default FacilityOverviewView;
