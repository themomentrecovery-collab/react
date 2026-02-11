import React from 'react';
import {useAuth} from '../../contexts/AuthContext';

const occupancyMetrics = [
  {label: 'Occupied beds', value: 128, delta: '+6 vs yesterday', tone: 'neutral'},
  {label: 'Available capacity', value: 14, delta: '6 reserved for agency holds', tone: 'caution'},
  {label: 'Average length of stay', value: '27 days', delta: '-2 days vs last month', tone: 'positive'},
  {label: 'Staff coverage', value: '98%', delta: 'Fully staffed for next 48 hrs', tone: 'positive'},
];

const unitOccupancy = [
  {unit: 'Acute recovery', occupied: 32, available: 2, notes: 'High acuity'},
  {unit: 'Step-down', occupied: 41, available: 5, notes: '3 admissions today'},
  {unit: 'Transitional living', occupied: 29, available: 4, notes: 'Ideal for short-term'},
  {unit: 'Outpatient', occupied: 26, available: 3, notes: 'Group sessions at capacity'},
];

const upcomingTransitions = [
  {date: 'Today · 3:00 PM', summary: 'Discharge – Rivera, Room 211B · Agency arranged transport'},
  {date: 'Tomorrow · 9:00 AM', summary: 'Admission – Chen, Step-down Unit · Requires bariatric bed'},
  {date: 'Tomorrow · 2:30 PM', summary: 'Family meeting – Johnson, Transitional living · Agency joining remotely'},
];

const facilityAlerts = [
  {
    title: 'Isolation protocol audit',
    detail: 'Complete the weekly isolation checklist for Acute recovery wing.',
    tone: 'caution',
  },
  {
    title: 'Therapy staffing variance',
    detail: 'Two therapy sessions need coverage on Wednesday afternoon.',
    tone: 'neutral',
  },
  {
    title: 'Facilities maintenance',
    detail: 'West building HVAC maintenance scheduled tonight at 9 PM.',
    tone: 'info',
  },
];

function FacilityOverviewView() {
  const {user} = useAuth();

  return (
    <div className="hub-view hub-view--facility-overview">
      <section className="hub-section">
        <header className="hub-section__header">
          <h2>Operational snapshot</h2>
          <p>
            {user?.name
              ? `${user.name}, here is the current census and staffing outlook for your facility.`
              : 'Sign in to personalize census data and staffing coverage for your facility.'}
          </p>
        </header>
        <div className="hub-metric-grid">
          {occupancyMetrics.map((metric) => (
            <article key={metric.label} className={`hub-metric hub-metric--${metric.tone}`}>
              <header>
                <p className="hub-metric__label">{metric.label}</p>
                <p className="hub-metric__value">{metric.value}</p>
              </header>
              <p className="hub-metric__delta">{metric.delta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="hub-section hub-section--split">
        <article className="hub-card hub-card--table">
          <header className="hub-card__header">
            <div>
              <h3>Unit census</h3>
              <p>Bed availability across care levels and program units.</p>
            </div>
            <button type="button" className="hub-card__action">Update availability</button>
          </header>
          <table className="hub-table">
            <thead>
              <tr>
                <th scope="col">Unit</th>
                <th scope="col">Occupied</th>
                <th scope="col">Available</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {unitOccupancy.map((unit) => (
                <tr key={unit.unit}>
                  <th scope="row">{unit.unit}</th>
                  <td>{unit.occupied}</td>
                  <td>{unit.available}</td>
                  <td>{unit.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <aside className="hub-card hub-card--list">
          <header className="hub-card__header">
            <div>
              <h3>Upcoming transitions</h3>
              <p>Admissions, discharges, and key family touchpoints.</p>
            </div>
          </header>
          <ol className="hub-feed">
            {upcomingTransitions.map((transition) => (
              <li key={transition.summary} className="hub-feed__item">
                <p className="hub-feed__timestamp">{transition.date}</p>
                <p className="hub-feed__summary">{transition.summary}</p>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="hub-section">
        <article className="hub-card hub-card--alerts">
          <header className="hub-card__header">
            <div>
              <h3>Facility alerts</h3>
              <p>Action items coordinated with agency partners.</p>
            </div>
            <button type="button" className="hub-card__action">Open task board</button>
          </header>
          <ul className="hub-alerts">
            {facilityAlerts.map((alert) => (
              <li key={alert.title} className={`hub-alert hub-alert--${alert.tone}`}>
                <h4 className="hub-alert__title">{alert.title}</h4>
                <p className="hub-alert__detail">{alert.detail}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}

export default FacilityOverviewView;
