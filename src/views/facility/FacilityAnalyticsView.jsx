import React from 'react';
import {useNotifications} from '../../contexts/NotificationContext';

const censusAlerts = [
  'Therapy wing approaching max capacity',
  'Three residents scheduled for evaluation this week',
  'Two isolation rooms under maintenance',
];

function FacilityAnalyticsView() {
  const {addNotification} = useNotifications();

  const handleRefresh = () => {
    addNotification('Facility utilization forecast refreshed.', {type: 'info'});
  };

  return (
    <section className="dashboard-view dashboard-view--analytics">
      <header>
        <h2>Facility analytics</h2>
        <p>Forecast admissions, discharges, and staffing needs for your location.</p>
      </header>
      <article>
        <ul className="dashboard-view__list">
          {censusAlerts.map((alert) => (
            <li key={alert}>{alert}</li>
          ))}
        </ul>
        <button type="button" onClick={handleRefresh}>
          Refresh utilization forecast
        </button>
      </article>
    </section>
  );
}

export default FacilityAnalyticsView;
