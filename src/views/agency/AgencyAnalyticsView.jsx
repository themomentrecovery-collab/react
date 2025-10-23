import React from 'react';
import {useNotifications} from '../../contexts/NotificationContext';

const referralSources = [
  {name: 'Direct outreach', percent: 46},
  {name: 'State referral portal', percent: 33},
  {name: 'Partner facilities', percent: 21},
];

function AgencyAnalyticsView() {
  const {addNotification} = useNotifications();

  const handleGenerateReport = () => {
    addNotification('Queued agency pipeline analytics export.', {type: 'success'});
  };

  return (
    <section className="dashboard-view dashboard-view--analytics">
      <header>
        <h2>Agency analytics</h2>
        <p>Discover trends across your referral sources and program placements.</p>
      </header>
      <article>
        <ul className="dashboard-view__list">
          {referralSources.map((source) => (
            <li key={source.name}>
              {source.name}: <strong>{source.percent}%</strong>
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleGenerateReport}>
          Export pipeline summary
        </button>
      </article>
    </section>
  );
}

export default AgencyAnalyticsView;
