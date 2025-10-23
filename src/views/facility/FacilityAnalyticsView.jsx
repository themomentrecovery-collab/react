import React from 'react';
import {useNotifications} from '../../contexts/NotificationContext';

const censusHighlights = [
  {label: 'Current occupancy', value: '90%', detail: '-3 pts vs target', tone: 'neutral'},
  {label: 'Projected occupancy (7d)', value: '93%', detail: '+2 pts vs forecast', tone: 'positive'},
  {label: 'Readmission risk', value: '8%', detail: '3 residents flagged', tone: 'caution'},
];

const staffingCoverage = [
  {discipline: 'Nursing', coverage: '97%', variance: '+2% surplus'},
  {discipline: 'Therapy', coverage: '89%', variance: '-1 therapist'},
  {discipline: 'Case management', coverage: '100%', variance: 'Fully staffed'},
  {discipline: 'Dietary', coverage: '95%', variance: 'Hiring in progress'},
];

const acuityBreakdown = [
  {level: 'High acuity', percent: 42},
  {level: 'Moderate', percent: 37},
  {level: 'Step-down', percent: 21},
];

function FacilityAnalyticsView() {
  const {addNotification} = useNotifications();

  const handleRefreshForecast = () => {
    addNotification('Facility utilization forecast refreshed for the upcoming week.', {
      type: 'info',
    });
  };

  return (
    <div className="hub-view hub-view--facility-analytics">
      <section className="hub-section">
        <header className="hub-section__header">
          <h2>Utilization analytics</h2>
          <p>Forecast occupancy and staffing demands across units.</p>
        </header>
        <div className="hub-metric-grid hub-metric-grid--narrow">
          {censusHighlights.map((highlight) => (
            <article key={highlight.label} className={`hub-metric hub-metric--${highlight.tone}`}>
              <header>
                <p className="hub-metric__label">{highlight.label}</p>
                <p className="hub-metric__value">{highlight.value}</p>
              </header>
              <p className="hub-metric__delta">{highlight.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="hub-section hub-section--split">
        <article className="hub-card hub-card--chart">
          <header className="hub-card__header">
            <div>
              <h3>Daily census trend</h3>
              <p>Comparison of admissions and discharges for the past 14 days.</p>
            </div>
            <button type="button" className="hub-card__action" onClick={handleRefreshForecast}>
              Refresh forecast
            </button>
          </header>
          <figure className="hub-chart" role="img" aria-label="Chart placeholder for daily census trend">
            <div className="hub-chart__placeholder">Area chart: admissions vs discharges</div>
          </figure>
        </article>
        <article className="hub-card hub-card--chart">
          <header className="hub-card__header">
            <div>
              <h3>Acuity mix</h3>
              <p>Distribution of residents across acuity levels.</p>
            </div>
          </header>
          <figure className="hub-chart" role="img" aria-label="Chart placeholder for acuity mix">
            <div className="hub-chart__placeholder">
              {acuityBreakdown.map((slice) => (
                <span key={slice.level}>{`${slice.level}: ${slice.percent}%`}</span>
              ))}
            </div>
          </figure>
        </article>
      </section>

      <section className="hub-section">
        <article className="hub-card hub-card--table">
          <header className="hub-card__header">
            <div>
              <h3>Staffing coverage</h3>
              <p>Compare scheduled staff to required coverage for each discipline.</p>
            </div>
          </header>
          <table className="hub-table">
            <thead>
              <tr>
                <th scope="col">Discipline</th>
                <th scope="col">Coverage</th>
                <th scope="col">Variance</th>
              </tr>
            </thead>
            <tbody>
              {staffingCoverage.map((row) => (
                <tr key={row.discipline}>
                  <th scope="row">{row.discipline}</th>
                  <td>{row.coverage}</td>
                  <td>{row.variance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </div>
  );
}

export default FacilityAnalyticsView;
