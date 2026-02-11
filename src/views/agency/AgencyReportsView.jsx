import React from 'react';
import {useNotifications} from '../../contexts/NotificationContext';

const scheduledReports = [
  {
    name: 'Weekly pipeline summary',
    cadence: 'Fridays · 7:00 AM',
    recipients: 'leadership@northstar.agency',
    lastRun: 'Today · 07:15 AM',
  },
  {
    name: 'Partner facility performance',
    cadence: 'Mondays · 6:30 AM',
    recipients: 'ops@northstar.agency',
    lastRun: 'Sep 18 · 06:28 AM',
  },
  {
    name: 'State contract compliance',
    cadence: '1st business day · 8:00 AM',
    recipients: 'compliance@northstar.agency',
    lastRun: 'Sep 01 · 08:01 AM',
  },
];

const recentExports = [
  {name: 'Placement outcome detail', format: 'CSV', size: '1.2 MB', generated: 'Today · 08:55 AM'},
  {name: 'Referral notes archive', format: 'PDF', size: '3.8 MB', generated: 'Yesterday · 04:12 PM'},
  {name: 'Facility utilization snapshot', format: 'XLSX', size: '2.5 MB', generated: 'Sep 18 · 09:47 AM'},
];

const auditTrail = [
  {
    timestamp: 'Today · 09:10 AM',
    detail: 'Jordan Agency downloaded the weekly pipeline summary for distribution.',
  },
  {
    timestamp: 'Yesterday · 05:02 PM',
    detail: 'Dana Patel updated recipients for the partner facility performance report.',
  },
  {
    timestamp: 'Sep 18 · 09:50 AM',
    detail: 'Compliance team acknowledged delivery of state contract report.',
  },
];

function AgencyReportsView() {
  const {addNotification} = useNotifications();

  const handleGenerateReport = () => {
    addNotification('Generating latest compliance packet. You will be notified when it is ready.', {
      type: 'info',
    });
  };

  return (
    <div className="hub-view hub-view--agency-reports">
      <section className="hub-section">
        <header className="hub-section__header">
          <h2>Scheduled reports</h2>
          <p>Automated deliveries aligned to stakeholder cadences.</p>
        </header>
        <table className="hub-table">
          <thead>
            <tr>
              <th scope="col">Report</th>
              <th scope="col">Cadence</th>
              <th scope="col">Recipients</th>
              <th scope="col">Last run</th>
            </tr>
          </thead>
          <tbody>
            {scheduledReports.map((report) => (
              <tr key={report.name}>
                <th scope="row">{report.name}</th>
                <td>{report.cadence}</td>
                <td>{report.recipients}</td>
                <td>{report.lastRun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="hub-section hub-section--split">
        <article className="hub-card hub-card--table">
          <header className="hub-card__header">
            <div>
              <h3>Recent exports</h3>
              <p>Manual downloads completed by agency staff.</p>
            </div>
          </header>
          <table className="hub-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Format</th>
                <th scope="col">Size</th>
                <th scope="col">Generated</th>
              </tr>
            </thead>
            <tbody>
              {recentExports.map((exportItem) => (
                <tr key={exportItem.name}>
                  <th scope="row">{exportItem.name}</th>
                  <td>{exportItem.format}</td>
                  <td>{exportItem.size}</td>
                  <td>{exportItem.generated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <aside className="hub-card hub-card--list">
          <header className="hub-card__header">
            <div>
              <h3>Audit trail</h3>
              <p>Activity log for report access and configuration updates.</p>
            </div>
          </header>
          <ol className="hub-feed">
            {auditTrail.map((entry) => (
              <li key={entry.timestamp} className="hub-feed__item">
                <p className="hub-feed__timestamp">{entry.timestamp}</p>
                <p className="hub-feed__summary">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="hub-section">
        <div className="hub-card hub-card--actions">
          <div>
            <h3>Generate compliance packet</h3>
            <p>Bundle the latest placement outcomes, partner responses, and audit attestations.</p>
          </div>
          <button
            type="button"
            className="hub-card__action hub-card__action--primary"
            onClick={handleGenerateReport}
          >
            Generate packet
          </button>
        </div>
      </section>
    </div>
  );
}

export default AgencyReportsView;
